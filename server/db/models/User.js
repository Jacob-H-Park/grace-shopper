const { STRING, BOOLEAN, INTEGER,DATE } = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  DOB:{
    type: DATE,
    validate:{
      isDate: true
    }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  avatar: {
    type: STRING,
  },
  status: {
    type: STRING,
    defaultValue: "active",
  },
  address:{
    type:STRING
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password

  if (!bcrypt.compare(candidatePwd, this.password)) {
    const error = Error("Old password is not correct");
    error.status = 401;
    throw error;
  }
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }, oauth = false) {
  const user = await this.findOne({ where: { username } });
  if (oauth) {
    if (!user || password !== user.password) {
      const error = Error("Incorrect username/password");
      error.status = 401;
      throw error;
    }
  } else {
    if (!user || !(await user.correctPassword(password))) {
      const error = Error("Incorrect username/password");
      error.status = 401;
      throw error;
    }
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
