// Load express
var express = require('express');
var router = express.Router();

// Load the RPC handler. The parameter is the URL of the node.
const rpc = require('./rpc.js').rpc_actions("http://[::1]:7076");

// Load keys
const keys = require('./keys.js');

router.get('/', function(req, res) {
    res.send('Please specify the API function you want to use.');
});

router.get('/get_block_count', function(req, res) {
    rpc.get_block_count(function(body) {
        res.send(body);
    });
});

router.post('/request-payment-token', function(req, res) {
    res.send(keys.getRandomKey());
});

module.exports = router;