// Load express
var express = require('express');
var router = express.Router();

// Load the RPC handler. The parameter is the URL of the node.
const rpc = require('./rpc.js').rpc_actions("http://[::1]:7076");

// Load transaction class
const transaction = require('./transaction.js');

// Wallet
let wallet;

rpc.wallet_create(function(body) {
    wallet = body.wallet;
    console.log(wallet)
});

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

/** 
 * A payment request requires multiple fields
 *  - "token": The token provided by /request-payment-token.
 *  - "amount": The amount in xrb.
 *  - "merchant_address": The wallet the xrb should be sent to after the payment has been completed.
 *  - "callback_url": The URL that should receive a POST request when payment has been completed.
 */
router.post('/request-payment', function(req, res) {
    if(req.body.token === undefined) {
        res.send("Please request a payment token with /request-payment-token and set the field 'token'");
        return;
    }

    if(req.body.amount === undefined) {
        res.send("Please define the amount of xrb that should be sent.");
        return;
    }

    if(req.body.merchant_address === undefined) {
        res.send("Please define the merchant address.")
        return;
    }

    if(req.body.callback_url === undefined) {
        res.send("Please define the callback URL");
        return;        
    }

    let thisTransaction = transaction.getTransactionBasedOnPaymentToken(req.body.token, function(tx) {
        if(tx === undefined) {
            res.send("Incorrect token");
        } else {
            if(tx.getOrigin() !== req.connection.remoteAddress) {
                res.send("Incorrect IP address");
            } else {
                tx.setAmount(req.body.amount);
                tx.setMerchantAddress(req.body.merchant_address);
                tx.setCallbackUrl(req.body.callback_url);

                if(tx.getReceivingAddress() === undefined) {
                    rpc.payment_begin(wallet, function(body) {
                        tx.setReceivingAddress(body.account);
                        res.send(tx.getReceivingAddress());
                    });
                } else {
                    res.send(tx.getReceivingAddress());
                }
            }
        }
    });
});

module.exports = router;