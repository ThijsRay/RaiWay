// Load express
const express = require('express');
const app = express();

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