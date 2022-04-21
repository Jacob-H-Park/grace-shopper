const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const LineItem = require("../db/models/LineItem");

router.get("/:userId", async(req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false
      },
      include: {
        model: Product
      },
    });
    res.json(cart);
  } catch(e) {
    next(e);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product
      }
    });

    req.body.orderId = cart[0].id

    const addedItem = await LineItem.create({
      orderId: req.body.orderId,
      productId: req.body.productId
    });
  
  
    res.json(cart);
  } catch(e) {
    next(e);
  }
})

module.exports = router;