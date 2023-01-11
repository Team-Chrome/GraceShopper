const Sequelize = require("sequelize");
const db = require("../db");
const CartItem = require("./CartItem");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    defaultValue: "Coffee",
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "../public/images/brad.webp",
  },
  roaster: {
    type: Sequelize.STRING,
  },
  origin: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

Product.hasOne(CartItem, { as: "product" });
CartItem.belongsTo(Product);

module.exports = Product;
