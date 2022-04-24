const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const LineItem = require("../db/models/LineItem");
const User = require("../db/models/User");
const { isLoggedIn } = require('./backendProtect');


// Route "/api/cart"

router.get("/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product,
      },
    });
    res.json(cart);
  } catch (e) {
    next(e);
  }
});

router.post("/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isFulfilled: false,
      },
      include: {
        model: Product,
      },
    });

    const orderId = cart[0].id;

    const lineItemInCart = await LineItem.findOne({
      where: { orderId, productId: req.body.productId },
    });

    if (lineItemInCart) {
      lineItemInCart.quantity += 1;
      await lineItemInCart.save();
    } else {
      await LineItem.create({
        orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
    }

    res.json(cart);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
