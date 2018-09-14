/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User');

let CommentSchema = new Schema({
    postedBy: userSchema,
    replies: [],
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Comment', CommentSchema);