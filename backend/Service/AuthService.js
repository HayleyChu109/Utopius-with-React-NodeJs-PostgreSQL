const hashFunction = require("../Auth/hashFunction");
const config = require("../Auth/config");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  async login(email, password) {
    let matchedUser = await this.knex("account").where("email", email);

    if (matchedUser.length > 0) {
      let result = await hashFunction.checkPassowrd(
        password,
        matchedUser[0].password
      );
      if (result) {
        let payload = {
          id: matchedUser[0].id,
        };
        let token = jwt.sign(payload, config.jwtSecret);
        return {
          token: token,
          isAdmin: matchedUser[0].isAdmin,
          blacklist: matchedUser[0].blacklist,
        };
      } else {
        return { message: "Incorrect password" };
      }
    } else {
      return { message: "User does not exist" };
    }
  }

  // Check if user exists by email
  async checkExist(email) {
    let matchedUser = await this.knex("account").where("email", email);
    if (matchedUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Check if user exists by password
  async checkExistPassword(email) {
    let matchedUserPw = await this.knex("account")
      .select("password")
      .where("email", email);
    console.log(matchedUserPw);
    if (matchedUserPw.length === 0 || matchedUserPw[0].password === null) {
      return false;
    } else {
      return true;
    }
  }

  // Check if user exists by Facebook Id
  async checkExistFb(facebookId) {
    let matchedFbUser = await this.knex("account").where(
      "facebookId",
      facebookId
    );
    if (matchedFbUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Check if user exists by Google Id
  async checkExistGoogle(googleId) {
    let matchedGoogleUser = await this.knex("account").where(
      "gmailId",
      googleId
    );
    if (matchedGoogleUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async signup(newUser) {
    let userId = await this.knex("account").insert(newUser).returning("id");
    return { id: userId };
  }

  async postPw(email, password) {
    let userId = await this.knex("account")
      .update({ password: password })
      .where("email", email)
      .returning("id");
    return { id: userId };
  }

  // Facebook login
  async postFbLogin(newUser) {
    let userId = await this.knex("account").insert(newUser).returning("id");
    let payload = { id: Number(userId) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async postFbId(email, facebookId) {
    let userId = await this.knex("account")
      .update({ facebookId: facebookId })
      .where("email", email)
      .returning("id");
    let payload = { id: Number(userId) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async getFbUser(facebookId) {
    let userId = await this.knex("account")
      .select("id")
      .where("facebookId", facebookId);
    let payload = { id: Number(userId[0].id) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  // Google login
  async postGoogleLogin(newUser) {
    let userId = await this.knex("account").insert(newUser).returning("id");
    let payload = { id: Number(userId) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async postGoogleId(email, googleId) {
    let userId = await this.knex("account")
      .update({ gmailId: googleId })
      .where("email", email)
      .returning("id");
    let payload = { id: Number(userId) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }

  async getGoogleUser(googleId) {
    let userId = await this.knex("account")
      .select("id")
      .where("gmailId", googleId);
    let payload = { id: Number(userId[0].id) };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }
}

module.exports = AuthService;
