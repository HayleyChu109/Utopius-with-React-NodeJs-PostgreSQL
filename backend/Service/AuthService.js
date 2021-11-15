const hashFunction = require("../Auth/hashFunction");
const config = require("../Auth/config");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  async login(email, password) {
    let matchedUser = await this.knex("users").where("email", email);

    if (matchedUser.length > 0) {
      let result = await hashFunction.checkPassowrd(
        password,
        matchedUser[0].password
      );
      if (result) {
        let payload = {
          id: matchedUser[0].id,
          username: matchedUser[0].username,
        };
        let token = jwt.sign(payload, config.jwtSecret);
        return { token };
      } else {
        return { message: "Incorrect password" };
      }
    } else {
      return { message: "User does not exist" };
    }
  }

  async checkExist(email) {
    let matchedUser = await this.knex("users").where("email", email);
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
