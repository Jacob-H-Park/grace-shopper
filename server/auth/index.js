const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { OAuth2Client } = require("google-auth-library");
const passport = require("passport");

module.exports = router;

const clientId =
  "1058128297512-29b55ub5cermd4npgdqef22vaa4qpgua.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

// Route "/auth"

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// google login
router.post("/googlelogin", async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });
    const { email_verified, email, name, picture } = response.payload;

    if (email_verified) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.send({
          token: await User.authenticate(
            { username: name, password: user.password },
            true
          ),
          username: name,
          email,
          password: user.password,
        });
      } else {
        const newUser = await User.create({
          email,
          username: name,
          password: "123",
          avatar: picture,
        });
        res.send({
          token: await newUser.generateToken(),
          username: name,
          email,
          password: newUser.password,
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/comparepassword", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send({ isTrue: await user.correctPassword(req.body.oldPassword) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});
router.put("/edit", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const updated_user = await user.update(req.body);
    res.send(updated_user);
  } catch (err) {
    next(err);
  }
});

router.put("/changepassword", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const updated_user = await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

// route for updating user's favorite list
router.put("/favorite", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const updated_user = await user.update(req.body);
    res.send(updated_user);
  } catch (err) {
    next(err);
  }
});

// authentication with twitter login
router.get('/twitter', passport.authenticate('twitter'));

// callback route for twitter to redirect to
// hand control to passport to use code to grab profile info
router.get('/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  async (req, res) => {
    // Successful authentication, all the user info is attched to 
    // req.user and req.session.passport.user
    // redirect to the home page
    res.redirect('/');
  }
);

router.get('/facebook',
  passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get('/auth/instagram',
  passport.authenticate('instagram'));

router.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// route that lets the frontend fetch the user info from OAuth login
router.get('/getUser', async (req, res, next) => {
  try {
    // check if req.session exists
    if (Object.keys(req.session).length !== 0) {
      const user = req.session.passport.user;
      const { username, password, email } = user;
      res.send({
        token: await User.authenticate(
          { username, password },
          true
        ),
        username,
        email,
        password,
      });
    }
  } catch (err) {
    next(err);
  }
});

// route logout for OAuth
router.get("/logout", (req, res, next) => {
  try {
    // req.session.passport is available as cookie session for a defined time (1 day) in app.js
    // as long as you don't remove it.
    if (Object.keys(req.session).length !== 0) {
      req.session = null;
      // req.session.passport.logout();
      // req.session.destroy();
      // res.clearCookie('connect.sid');
    }
    
    res.send("done");
  } catch (err) {
    next(err);
  }
  
});