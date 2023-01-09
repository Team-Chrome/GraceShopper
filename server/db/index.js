//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Transaction = require('./models/Transaction');

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);

Product.belongsTo(Cart);
Cart.hasMany(Product);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
    Transaction,
  },
};
