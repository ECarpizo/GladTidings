/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
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

let CategorySchema = new Schema({
    name: String
});

let CommentSchema = new Schema({
    postedBy: UserSchema,
    replies: [],
    created: {
        type: Date,
        default: Date.now
    }
});

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
        type: [CommentSchema]
    },
    categories: {
        type: [CategorySchema]
    },
    views: Number
});
module.exports = mongoose.model('Posts', PostSchema);