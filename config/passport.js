const JwtStratagy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/config");
const db = require("../database");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStratagy(opts, (jwt_payload, done) => {
      db.query(`SELECT * FROM users WHERE name = ?`, {
        replacements: [jwt_payload.name],
        type: db.QueryTypes.SELECT
      })
        .then(user => {
          if (user[0]) {
            return done(null, user[0]);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
