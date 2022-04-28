const Sequelize = require("sequelize");
const db = require("../db");


const Promotion = db.define("promotions", {
  name: {
    type: Sequelize.STRING,
    isNull: false
  },
  Code: {
    type: Sequelize.STRING,
    isNull: false
  },
  Discount:{
    type:Sequelize.DECIMAL(10, 2),
    isNull: false
  },
  Start_Date:{
    type:Sequelize.DATE,
    isNull: false
  },
  End_Date:{
    type:Sequelize.DATE,
    isNull: false
  },
  Free_Shipping:{
      type: Sequelize.BOOLEAN,
      default: false
  }
});

module.exports = Promotion;