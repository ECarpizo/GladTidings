/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Comments', CommentSchema);