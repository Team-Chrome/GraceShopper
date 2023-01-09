const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Coffee',
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
    type: Sequelize.NUMBER,
  },
  quantity: {
    type: Sequelize.NUMBER,
  },
});

module.exports = Product;
