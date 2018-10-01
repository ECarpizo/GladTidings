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
  // pictures: {
  //   type: [String],
  //   default: []
  // },
  content: String,
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
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Posts', PostSchema);
