const Sequelize = require("sequelize");
const db = require("../db");

const Card = db.define("card", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.STRING,
    isCreditCard: true,
    allowNull: false,
  },
  expiration: {
    type: Sequelize.STRING,
    isDate: {
      args: [["MM/YY"]],
    },
    isBefore: new Date(),
    allowNull: false,
  },
  csv: {
    type: Sequelize.INTEGER,
    len: [3, 4],
    allowNull: false,
  },
});

module.exports = Card;
