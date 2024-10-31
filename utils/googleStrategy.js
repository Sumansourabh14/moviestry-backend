const passport = require("passport");
const UserModel = require("../models/User");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

function setUpGoogleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          name: profile.displayName,
          email: profile.emails[0],
          password: null,
        };

        try {
          let user = await UserModel.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await UserModel.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
}

passport.serializeUser((user, done) => {
  console.log({ user });
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(`user=========>`, user);
  done(null, user);
});

module.exports = setUpGoogleStrategy;
