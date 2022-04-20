const router = require('express').Router()
const { models: { User }} = require('../db');
const Order = require('../db/models/Order');
const Product = require('../db/models/Product');
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch(e) {
    next(e);
  }
})

router.get('/:userID/cart', async (req, res, next) => {
  try {
    
    const cart = await Order.findOne({
      where: {
        userId: req.params.userID,
        isFulfilled: false
      },
      include: {
        model: Product
      }
    });
    console.log(req.params);
    console.log(cart);
    res.json(cart);
  } catch(e) {
    next(e);
  }
});

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const cart = Order.create({
      userId: req.params.userId,
      isFulfilled: false
    });

    res.json(cart);
  } catch(e) {
    next(e);
  }
})
