
require('dotenv').config();
var express = require('express');
var routes = require('./app/routes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes)

var connection = mongoose.connect(process.env.MONGODB).connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function() {
  console.log('MongoDB is now connected');
});

app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + process.env.PORT);
});

module.exports = app;
