'use strict';

require('dotenv').config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./app/routes/index');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var connection = mongoose.connect(process.env.MONGODB).connection;

connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', function() {
  console.log('Mongodb is now connected');
})

app.listen(process.env.PORT || 3000);
console.log('App now listening on port ' + process.env.PORT || 3000);


module.exports = app;
