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
                }
            }
        );
    }

    return {
        get_block_count: function(callback) {
            do_post_request({'action': 'block_count'}, callback);
        }
    }
    
});

module.exports = {
    'rpc_actions': rpc_actions
}