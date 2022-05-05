const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const LineItem = require("../db/models/LineItem");
const { requireLoggedIn, not_requireLoggedIn } = require("./backendProtect");

// Route "/api/cart"

router.get("/:userId", not_requireLoggedIn, async (req, res, next) => {
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

router.put("/update/:orderId", async (req, res, next) => {
  try {
    const orderFulfilled = await Order.findByPk(req.body.orderId);
    res.send(await orderFulfilled.update({ isFulfilled: true })).status(200);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const type = req.body.type;

    const singleProduct = await LineItem.findOne({
      where: {
        orderId,
        productId,
      },
    });

    let quantity = singleProduct.quantity;

    if (type === "increase") {
      quantity = quantity + 1;
    }

    if (type === "decrease") {
      quantity = quantity - 1 <= 1 ? 1 : quantity - 1;
    }

    res.send(await singleProduct.update({ quantity: quantity })).status(200);
  } catch (e) {
    next(e);
  }
});

router.post("/:userId", not_requireLoggedIn, async (req, res, next) => {
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
      lineItemInCart.quantity += req.body.quantity;
      await lineItemInCart.save();
    } else {
      await LineItem.create({
        orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
    }
    res.json(cart[0]);
  } catch (e) {
    next(e);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const productId = req.body.productId;

    const singleProduct = await LineItem.findOne({
      where: {
        orderId,
        productId,
      },
    });

    await singleProduct.destroy();

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
