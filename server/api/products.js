const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const { isAdmin } = require('./backendProtect');

// Route "/api/products"

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = await Product.findByPk(req.params.id);
    const updated = await data.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });
    //we could decide which attributes to show later on
    //do we want to use res.json or res.send?
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product).sendStatus(204);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
