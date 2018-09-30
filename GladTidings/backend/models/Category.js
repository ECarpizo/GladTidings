/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: String,
    category: Boolean
});
module.exports = mongoose.model('Categories', CategorySchema);