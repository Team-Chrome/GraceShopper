const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM,
    values: ['CLOSED', 'OPEN'],
    defaultValue: 'OPEN',
  },
  // TODO: FIGURE OUT TOTALS AS VIRTUAL IN SEQUELIZE

  // total: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return this.items.reduce((acc, item) => acc + item.price, 0);
  //   },
  //   set(value) {
  //     throw new Error('Do not try to set the `name` value!');
  //   },
  // },
});

module.exports = Cart;
