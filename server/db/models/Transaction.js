const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {});

module.exports = Transaction;
