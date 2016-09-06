var express = require('express');
var router = express.Router();
const Message = require('../models/Message');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello-world-server root');
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

