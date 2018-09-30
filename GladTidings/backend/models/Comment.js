/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  title: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  created: {
    type: Date,
    default: Date.now
  },
  comment: String,
  replies: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }],
    default: []
  }
});
module.exports = mongoose.model('Comments', CommentSchema);