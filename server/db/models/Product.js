const { STRING, DECIMAL, TEXT, INTEGER } = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  description: {
    type: TEXT,
  },
  image_url: {
    type: STRING,
  },
  stock: {
    type: INTEGER,
  },
  category: {
    type: TEXT,
  }
});

module.exports = Product;
