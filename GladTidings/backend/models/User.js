/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// how to have a schema inside another schema:
// https://www.youtube.com/watch?v=3p0wmR973Fw&t=0s&index=10&list=PLp3WJHpPoQLHu3lUNzfJbDs7dnfc7bOLj
let UserSchema = new Schema({
  email: {
    type: String,
    // required: true
    // type: String,
    // required: [true, 'Email is required'],
    // unique: [true, 'The email you have entered already exists'],
    // validate: {
    //     validator: function(v) {
    //         let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         return emailRegex.test(v);
    //     },
    // }
  },
  password: {
    type: String,
    // required: true
  },
  firstName: String,
  lastName: String,
  tier: {
    type: String,
    default: 'Standard'
  },
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// The parameter value you give for the first parameter
// is the name of the database table that will be generated
// in mongoDB given that the table does not exist. 
// Since the value is 'Users', a user table is generated if 
// one does not exist.
module.exports = mongoose.model('Users', UserSchema);
