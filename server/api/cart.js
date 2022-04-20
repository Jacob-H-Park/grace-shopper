const router = require("express").Router();
const Order = require("../db/models/Order");
const Product = require("../db/models/Product");

router.get("/:userId", async(req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isFulfilled: false
      },
      include: {
        module: Product
      },
    });
    res.json(cart);
  } catch(e) {
    next(e);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     const cart = await Order.create(req.body.userId);
//     res.json(cart);
//   } catch(e) {
//     console.log(e);
//   }
// })

module.exports = router;