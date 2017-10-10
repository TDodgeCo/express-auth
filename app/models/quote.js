var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Quote', new Schema({
  width: Number,
  length: Number,
  height: Number,
  price: Number
}));
