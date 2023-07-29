const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");


passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = {
        name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        avtar: profile._json.picture,
      };
      return cb(null, user);
    }
  )
);

module.exports = { passport };