const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  quantity: Sequelize.INTEGER,
  price: Sequelize.DOUBLE,
});

module.exports = CartItem;
