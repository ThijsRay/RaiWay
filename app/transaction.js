// Load keys
const keys = require('./keys.js');

function Transaction(origin) {
    this.paymentToken = keys.getRandomKey(128);
    this.origin = origin;
};

Transaction.prototype.getPaymentToken = function() {
    return this.paymentToken;
};

Transaction.prototype.getOrigin = function() {
    return this.origin;
};

Transaction.prototype.setOrigin = function(origin) {
    this.origin = origin;
};

var transactions = [];

var getTransactionBasedOnPaymentToken = function(token, callback) {
    console.log(transactions);
    for(var index in transactions) {
        if(transactions[index].getPaymentToken() == token) {
            callback(transactions[index]);
            return;
        }
    }
    callback(undefined);
}

module.exports = {Transaction, transactions, getTransactionBasedOnPaymentToken}