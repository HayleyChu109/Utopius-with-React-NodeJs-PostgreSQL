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
}

module.exports = AuthRouter;
