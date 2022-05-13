const router = require('express').Router()
const Order = require("../db/models/Order");
// Route "/api/orders"

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({});
    res.json(orders);
  } catch (err) {
    next(err)
  }
});

router.get('/fulfilled/:userId', async (req, res, next) => {
  try{
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isFulfilled: true
      }
    });

    res.json(orders);
  } catch(err) {
    next(err);
  }
})

module.exports = router;