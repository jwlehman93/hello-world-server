var express = require('express');
var Message = require('../models/Message');
var router = express.Router();


router.get('/', function(req, res) {
  res.send('Hello, World. I am a server');
});

router.get('/messages', function(req, res, next) {
  Message.find(function(err, messages) {
    if (err) {
      res.send(err);
    }
    res.send(messages);
  })
});

router.post('/messages', function(req, res, next) {
  Message(req.body).save(function(err) {
    if (err) {
      res.send(err);
    }
    res.send('Message saved');
  })
});

module.exports = router;
