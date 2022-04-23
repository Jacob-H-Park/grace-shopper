const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Product = require("./Product");


const LineItem = db.define('lineItem', {
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: "id"
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id"
    },
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = LineItem;