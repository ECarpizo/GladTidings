/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReplySchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Replies', ReplySchema);