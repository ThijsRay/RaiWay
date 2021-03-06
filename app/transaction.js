// Load keys
const keys = require('./keys.js');

function Transaction(origin) {
    //this.paymentToken = keys.getRandomKey(128);
    // A random token used for testing
    this.paymentToken = "VnwpTeY4odRA9aL5W7aSN2TuPRVtC8YnvTaNWWuD1LPlUfr7ScwU8huNdMYLsgU8cttmQDorHQHoqJIKm2n4QJUfYgbper2lneC0xF6lBjCcrkoQVh99ilY1vz0kGdZM"
    this.origin = origin;
};

Transaction.prototype.getPaymentToken = function() { return this.paymentToken };

Transaction.prototype.getOrigin = function() { return this.origin };
Transaction.prototype.setOrigin = function(origin) { this.origin = origin };

Transaction.prototype.getAmount = function() { return this.amount };
Transaction.prototype.setAmount = function(amount) { this.amount = amount };

Transaction.prototype.getMerchantAddress = function() { return this.merchant_address };
Transaction.prototype.setMerchantAddress = function(address) { this.merchant_address = address };

Transaction.prototype.getCallbackUrl = function() { return this.callback_url };
Transaction.prototype.setCallbackUrl = function(callback_url) { this.callback_url = callback_url };

Transaction.prototype.getReceivingAddress = function() { return this.receiving_address };
Transaction.prototype.setReceivingAddress = function(receiving_address) { this.receiving_address = receiving_address };

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