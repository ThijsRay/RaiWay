const request = require('request');

var rpc_actions = (function(url) {

    return {
        get_block_count: function() {
            request.post(url, 
                {
                    json: { 'action': 'block_count' } 
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                    }
                }
            );
        }
    }
    
});

module.exports = {
    'rpc_actions': rpc_actions
}