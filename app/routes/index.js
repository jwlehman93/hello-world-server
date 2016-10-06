var express = require('express');

var router = express.Router();


router.get('/', function(req, res) {
  res.send('Hello, World. I am a server');
});

router.get('/message', function(req, res) {
  res.send('You asked for a message, so now you have got one!')
});

module.exports = router;
