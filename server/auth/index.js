const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { OAuth2Client } = require("google-auth-library");
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

router.post("/googlelogin", async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });
    const { email_verified, email, name } = response.payload;

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
