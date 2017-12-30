// Load request
const request = require('request');

var rpc_actions = (function(url) {

    // A generic function to do post requests to URL
    function do_post_request(parameters, callback) {
        request.post(url, 
            {
                json: parameters
            }, 
            function (error, response, body) {
                if(!error && response.statusCode == 200) {
                    callback(body);
                } else {
                    console.log("RPC failed, are you sure you have a node up and running?");
                }
            }
        );
    }

    return {
        get_block_count: function(callback) {
            do_post_request({'action': 'block_count'}, callback);
        },
        wallet_create: function(callback) {
            do_post_request({"action": "wallet_create"}, callback);
        },
        payment_begin: function(wallet, callback) {
            do_post_request({"action": "payment_begin", "wallet": wallet}, callback);
        }
    }
    
});

module.exports = {
    'rpc_actions': rpc_actions
}