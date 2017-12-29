// Load keys
const keys = require('./keys.js');

var Transaction = function() {
    this.paymentToken = keys.getRandomKey(128);
}

Transaction.prototype.getPaymentToken = function() {
    return this.paymentToken;
}

var transactions = [];

module.exports = {Transaction, transactions}