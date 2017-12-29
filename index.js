const request = require('request');
const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send("Hello world");
});

// Listen to port 5000
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});