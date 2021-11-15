const hashFunction = require("../Auth/hashFunction");
const config = require("../Auth/config");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  async login(username, password) {
    let matchedUser = await this.knex("users").where("username", username);

    if (matchedUser.length > 0) {
      let result = await hashFunction.checkPassowrd(
        password,
        matchedUser[0].password
      );
      if (result) {
        let payload = {
          id: matchedUser[0].id,
          name: matchedUser[0].name,
        };
        let token = jwt.sign(payload, config.jwtSecret);
        return { token };
      } else {
        return { message: "Incorrect password" };
      }
    } else {
      return { message: "Incorrect username" };
    }
  }

  async checkExist(username) {
    let matchedUser = await this.knex("users").where("username", username);
    if (matchedUser.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async signup(newUser) {
    let userId = await this.knex("users").insert(newUser).returning("id");
    return { id: userId };
  }
}

module.exports = AuthService;
