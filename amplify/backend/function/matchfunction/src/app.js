var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var app = express();

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.get('/match', function (req, res) {
    const shapes = ['rock', 'paper', 'scissors'];
    const index = Math.floor(Math.random() * 3);
    res.json({shape: shapes[index]});
});

app.listen(3000, function () {
    console.log("App started")
});

module.exports = app;
