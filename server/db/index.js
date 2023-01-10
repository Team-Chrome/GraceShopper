//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Transaction = require("./models/Transaction");
const CartItem = require("./models/CartItem");

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);

Transaction.belongsTo(User);
User.hasMany(Transaction);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

Transaction.belongsTo(Cart);
Cart.hasOne(Transaction);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
    Transaction,
    CartItem,
  },
};
