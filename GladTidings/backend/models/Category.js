/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: String,
    active: {
        type: Boolean,
        default: true
      }
});
module.exports = mongoose.model('Categories', CategorySchema);