//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const LineItem = require("./models/LineItem");
const Order = require("./models/Order");

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
  through: LineItem,
  foreignKey: "productId"
});

Product.belongsToMany(Order, {
  through: LineItem,
  foreignKey: "orderId"
});

module.exports = {
  db,
  models: {
    User,
    Product,
    LineItem,
    Order
  },
};
