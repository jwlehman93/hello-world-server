var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  message: {type: String, required: true},
  room: {type: String, required: true},
  user: {type: String, required: true}
});

module.exports = mongoose.model('Message', messageSchema);

