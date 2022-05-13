const router = require('express').Router()
const { models: { User, Order } } = require('../db');
const { requireLoggedIn, not_requireLoggedIn } = require('./backendProtect');

module.exports = router

// Route "/api/users"

router.get('/', not_requireLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email', 'isAdmin', 'avatar', 'status']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:userId', not_requireLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', not_requireLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    user.destroy();
    res.sendStatus(204);
  } 
  catch (err) {
    next(err);
  }
});

