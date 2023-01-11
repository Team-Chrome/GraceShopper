const Sequelize = require("sequelize");
const db = require("../db");

const BillingAddress = db.define("billing-address", {
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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    len: [10],
    allowNull: false,
  },
});

module.exports = BillingAddress;
