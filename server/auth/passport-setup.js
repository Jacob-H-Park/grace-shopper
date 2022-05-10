const passport = require("passport");
// loads environment variables from a .env file into process.env
require('dotenv').config({ path: "../../.env" })
const {
  models: { User },
} = require("../db");

const FacebookStrategy = require("passport-facebook").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

// keys
// const TWITTER = {
//     consumerKey: "",
//     consumerSecret: ""
// };

// Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: keys.FACEBOOK.clientID,
//     clientSecret: keys.FACEBOOK.clientSecret,
//     callbackURL: "/auth/facebook/callback"
// },
// (accessToken, refreshToken, profile, cb) => {
//     console.log(chalk.blue(JSON.stringify(profile)));
//     user = { ...profile };
//     return cb(null, profile);
// }));

// Instagram Strategy
// passport.use(new InstagramStrategy({
//     clientID: keys.INSTAGRAM.clientID,
//     clientSecret: keys.INSTAGRAM.clientSecret,
//     callbackURL: "/auth/instagram/callback"
// },
// (accessToken, refreshToken, profile, cb) => {
//     console.log(chalk.blue(JSON.stringify(profile)));
//     user = { ...profile };
//     return cb(null, profile);
// }));

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
    console.log("TWITTER TWITTER", id, emails, username, photos);

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