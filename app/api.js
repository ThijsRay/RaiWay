// Load express
var express = require('express');
var router = express.Router();

// Load the RPC handler. The parameter is the URL of the node.
const rpc = require('./rpc.js').rpc_actions("http://[::1]:7076");

// Load transaction class
const transaction = require('./transaction.js');

router.get('/', function(req, res) {
    res.send('Please specify the API function you want to use.');
});

router.get('/get_block_count', function(req, res) {
    rpc.get_block_count(function(body) {
        res.send(body);
    });
});

router.post('/request-payment-token', function(req, res) {
    // Create new transaction
    let newTransaction = new transaction.Transaction(req.connection.remoteAddress);
    
    // Add transaction to current list of transactions
    transaction.transactions.push(newTransaction);

    // Send the randomly generated payment token to the client
    res.send(newTransaction.getPaymentToken());
});

router.post('/request-payment', function(req, res) {
    console.log(req.body);
    if(req.body.token === undefined) {
        res.send("Please request a payment token with /request-payment-token and set the field 'token'");
        return;
    }

    if(req.body.amount === undefined) {

    }

    if(req.body.receive_wallet === undefined) {

    }

    if(req.body.callback_url === undefined) {

    }

    let thisTransaction = transaction.getTransactionBasedOnPaymentToken(req.body.token, function(tx) {
        console.log(tx);
        if(tx === undefined) {
            res.send("Transaction not found");
        } else {
            res.send("OK");
        }
    });
});

module.exports = router;