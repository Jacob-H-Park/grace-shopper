const passport = require("passport");
// loads environment variables from a .env file into process.env
require('dotenv').config({ path: "../../.env" })
const {
  models: { User },
} = require("../db");

const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { 
      emails, 
      displayName,
      photos
    } = profile;

    if (emails) {
      const email = emails[0].value;
      const avatar = photos[0].value;
      // check if user already exists in our db
      const user = await User.findOne({ where: { email } });
      if (user) {
        // already have the user, pass the user to browser cookie
        return cb(null, user);
      } else {
        // if not, create user in our db
        const newUser = await User.create({
          email,
          username: email.substring(0, email.indexOf('@')),
          password: "123",
          avatar,
        });
        return cb(null, newUser);
      }
    }
}));

// Instagram Strategy
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: "/auth/instagram/callback"
  },
   (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));

// Twitter Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "/auth/twitter/callback",
    includeEmail: true
  },
  async (token, tokenSecret, profile, cb) => {
    const {
        id, 
        emails, 
        username,
        photos
    } = profile; 

    if (emails) {
        const email = emails[0].value;
        const avatar = photos[0].value;
        // check if user already exists in our db
        const user = await User.findOne({ where: { email } });
        if (user) {
          // already have the user, pass the user to browser cookie
          return cb(null, user);
        } else {
          // if not, create user in our db
          const newUser = await User.create({
            email,
            username,
            password: "123",
            avatar,
          });
          return cb(null, newUser);
        }
    }
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});