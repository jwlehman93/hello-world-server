
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hey, I am the root route');
});

router.get('/message', function(req, res) {
  res.send('You asked for a message, so now you have got one!');
});

module.exports = router;
