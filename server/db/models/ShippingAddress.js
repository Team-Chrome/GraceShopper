const Sequelize = require("sequelize");
const db = require("../db");

const ShippingAddress = db.define("shipping-address", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    len: [10],
    allowNull: false,
  },
});

module.exports = ShippingAddress;
