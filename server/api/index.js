const router = require("express").Router();
module.exports = router;

// API routes "/api"

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/images", require("./images"));
router.use("/promotions", require("./promotion"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

