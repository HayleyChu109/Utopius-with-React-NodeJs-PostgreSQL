const express = require("express");
const hashFunction = require("../Auth/hashFunction");

class AuthRouter {
  constructor(authService) {
    this.authService = authService;
  }

  router() {
    let router = express.Router();
    router.post("/login", this.postLogin.bind(this));
    router.post("/signup", this.postSignup.bind(this));
    router.put("/login/facebook", this.postFbLogin.bind(this));
    router.put("/login/google", this.postGoogleLogin.bind(this));
    return router;
  }

  async postLogin(req, res, next) {
    try {
      if (req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;
        let result = await this.authService.login(email, password);

        if (result.token) {
          res.status(200).json({
            token: result.token,
            isAdmin: result.isAdmin,
            blacklist: result.blacklist,
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
        let hashedPassword = await hashFunction.hashPassword(password);

        let repeatedUser = await this.authService.checkExist(email);
        let repeatedUserPw = await this.authService.checkExistPassword(email);
        if (repeatedUser && repeatedUserPw) {
          res.json({ message: "User already exist" });
        } else if (repeatedUser && !repeatedUserPw) {
          await this.authService.postPw(email, hashedPassword).then((data) => {
            res.status(200).json({ id: data.id });
          });
        } else {
          let newUser = {
            email: email,
            password: hashedPassword,
            isAdmin: false,
            token: 0,
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
    try {
      let email = req.body.userInfo.email;
      let facebookId = req.body.userInfo.id;
      let repeatedUser = await this.authService.checkExist(email);
      let repeatedFbUser = await this.authService.checkExistFb(facebookId);
      if (!repeatedUser && !repeatedFbUser) {
        let newUser = {
          email: email,
          facebookId: facebookId,
          isAdmin: false,
          token: 0,
          grade: "-",
          blacklist: false,
        };
        await this.authService.postFbLogin(newUser).then((token) => {
          res.json({ token: token });
        });
      } else if (repeatedUser && !repeatedFbUser) {
        await this.authService.postFbId(email, facebookId).then((token) => {
          res.json({ token: token });
        });
      } else {
        await this.authService.getFbUser(facebookId).then((token) => {
          res.json({ token: token });
        });
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }

  async postGoogleLogin(req, res, next) {
    try {
      let email = req.body.userInfo.email;
      let googleId = req.body.userInfo.googleId;
      let firstname = req.body.userInfo.givenName;
      let lastname = req.body.userInfo.familyName;

      let repeatedUser = await this.authService.checkExist(email);
      let repeatedGoogleUser = await this.authService.checkExistGoogle(
        googleId
      );
      if (!repeatedUser && !repeatedGoogleUser) {
        let newUser = {
          email: email,
          gmailId: googleId,
          firstName: firstname,
          lastName: lastname,
          isAdmin: false,
          token: 0,
          grade: "-",
          blacklist: false,
        };
        await this.authService.postGoogleLogin(newUser).then((token) => {
          res.json({ token: token });
        });
      } else if (repeatedUser && !repeatedGoogleUser) {
        await this.authService.postGoogleId(email, googleId).then((token) => {
          res.json({ token: token });
        });
      } else {
        await this.authService.getGoogleUser(googleId).then((token) => {
          res.json({ token: token });
        });
      }
    } catch (err) {
      next(err);
      throw new Error(err);
    }
  }
}

module.exports = AuthRouter;
