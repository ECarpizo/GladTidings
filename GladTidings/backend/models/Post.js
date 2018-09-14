/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('./Category');
const commentSchema = require('./Comment');

const PostSchema = new Schema({
    title: String,
    subtitle: String,
    author: String,
    created: {
        type: Date,
        default: Date.now
    },
    pictures: [String],
    content: String,
    comments: {
        type: [commentSchema]
    },
    categories: {
        type: [categorySchema]
    },
    views: Number
});
module.exports = mongoose.model('Post', PostSchema);