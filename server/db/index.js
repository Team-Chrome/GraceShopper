//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Transaction = require("./models/Transaction");
const CartItem = require("./models/CartItem");
const Card = require("./models/Card");
const BillingAddress = require("./models/BillingAddress");
const ShippingAddress = require("./models/ShippingAddress");

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasOne(CartItem, { as: "product" });
CartItem.belongsTo(Product);

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

BillingAddress.belongsTo(Card);
Card.hasOne(BillingAddress);

ShippingAddress.belongsTo(User);
User.hasMany(ShippingAddress);

Card.belongsTo(User);
User.hasMany(Card);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
    Transaction,
    CartItem,
    Card,
    ShippingAddress,
    BillingAddress,
  },
};
