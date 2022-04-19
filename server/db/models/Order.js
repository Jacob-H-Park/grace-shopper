const { STRING, BOOLEAN, INTEGER, DECIMAL } = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isCart: {
    type: BOOLEAN,
  },
  total: {
    type: DECIMAL
  }
});

module.exports = Order;
