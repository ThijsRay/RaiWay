// Load express
const express = require('express');
const app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.get('/', function(req, res) {
    res.send("Please use /api for requests");
});

// Route all /api requests to api.js
var api = require('./api');
app.use('/api', api);

// Listen to port 5000
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});