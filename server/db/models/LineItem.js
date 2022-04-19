const { DECIMAL, INTEGER } = require("sequelize");
const db = require("../db");


const LineItem = db.define('lineItem', {
  quantity: {
    type: INTEGER,
  },
  price: {
    type: DECIMAL
  }
});

module.exports = LineItem;