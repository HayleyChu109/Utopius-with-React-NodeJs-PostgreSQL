// Require passport & JWT
const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("./config");
const ExtractJwt = passportJWT.ExtractJwt;

// Setup login strategy
module.exports = (knex) => {
  const strategy = new passportJWT.Strategy(
    {
      secretOrKey: config.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      let matchedUser = await knex("account").where({ id: payload.id });

      if (matchedUser.length > 0) {
        let user = matchedUser[0];
        return done(null, { id: user.id });
      } else {
        return done(new Error("User not found"), null);
      }
    }
  );

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },

    authenticate: function () {
      return passport.authenticate("jwt", config.jwtSession);
    },

    isAdmin: function () {
      // Code to verify admin boolean here
    },

    isSetup: function() {
      // Code to check if member finished setting up
    }
  };
};
