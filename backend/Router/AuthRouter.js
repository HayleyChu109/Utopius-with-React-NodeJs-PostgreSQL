const express = require("express");
const axios = require("axios");
const hashFunction = require("../Auth/hashFunction");
const config = require("../Auth/config");
const jwt = require("jsonwebtoken");

class AuthRouter {
  constructor(authService) {
    this.authService = authService;
  }

  router() {
    let router = express.Router();
    router.post("/login", this.postLogin.bind(this));
    router.post("/signup", this.postSignup.bind(this));
    router.post("/login/facebook", this.postFbLogin.bind(this));
    return router;
  }

  async postLogin(req, res, next) {
    console.log(req.body);
    try {
      if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;
        let result = await this.authService.login(email, password);

        if (result.token) {
          res.status(200).json({
            token: result.token,
            isAdmin: result.isAdmin,
          });
        } else {
          res.json({ message: result.message });
        }
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postSignup(req, res, next) {
    try {
      if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;

        let repeatedUser = await this.authService.checkExist(email);
        if (repeatedUser) {
          res.json({ message: "User already exist" });
        } else {
          let hashedPassword = await hashFunction.hashPassword(password);
          let newUser = {
            email: email,
            password: hashedPassword,
            isAdmin: false,
            token: 100,
            grade: "-",
            blacklist: false,
          };
          await this.authService.signup(newUser).then((data) => {
            res.status(200).json({
              id: data.id,
            });
          });
        }
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postFbLogin(req, res, next) {
    if (req.body.userInfo.accessToken) {
      const accessToken = req.body.userInfo.accessToken;
      axios
        .get(`https://graph.facebook.com/me?access_token=${accessToken}`)
        .then(async (data) => {
          if (!data.data.error) {
            let email = req.body.userInfo.email;
            let facebookId = req.body.userInfo.id;
            let repeatedUser = await this.authService.checkExist(email);
            if (!repeatedUser) {
              let newUser = {
                email: email,
                facebookId: facebookId,
                isAdmin: false,
                token: 100,
                grade: "-",
                blacklist: false,
              };
              await this.authService.postFbLogin(newUser).then((token) => {
                res.json({
                  token: token,
                });
              });
            } else {
              // extract the facebook stored token and send it back here
              console.log(data);
              console.log("new place");
              await this.authService
                .getFbUser(req.body.userInfo.id)
                .then((token) => {
                  res.json({
                    token: token,
                  });
                });
            }
          } else {
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      res.sendStatus(401);
    }
  }
}

module.exports = AuthRouter;
