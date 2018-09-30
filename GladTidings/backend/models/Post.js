/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  subtitle: String,
  authors: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  },
  pictures: {
    type: [String],
    default: []
  },
  content: String,
  comments: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }],
    default: []
  },
  categories: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
    }],
    default: []
  },
  views: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('Posts', PostSchema);
