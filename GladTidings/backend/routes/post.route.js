/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');

// Create new Post
router.route('/create').post((req, res) => {
  let post = new Post(req.body);
  post
    .save()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Post creation failed',
        error: err
      });
    });
});

// Get all Posts
router.route('').get((req, res) => {
  Post
    .find()
    .populate('authors', '_id firstName lastName')
    .populate('categories')
    .exec()
    .then(posts => {
      res.status(200).json({
        posts: posts
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve posts',
        error: err
      });
    });
});

// Get Post by ID
router.route('/getById/:id').get((req, res) => {
  Post
    .findById(req.params.id)
    .populate('authors', '_id firstName lastName')
    .populate('categories')
    .exec()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve post: ',
        error: err
      });
    });
});

// Get Posts by User
router.route('/getByAuthors/:id').get((req, res) => {
  Post
    .find({
      authors: req.params.id
    })
    .populate('author', '_id firstName lastName')
    .populate('categories')
    .exec()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve posts: ',
        error: err
      });
    });
});

// Update Post info
router.route('/update/:id').put((req, res) => {
  Post
    .findOneAndUpdate({ _id: req.params.id}, req.body), {
      new: true
    }, (err, post) => {
      if (err)
        return res.status(404).json({
          message: 'Unable to update post',
          error: err
        });
      else {
        return res.status(200).json({
          message: 'Update successful',
          post: post
        });
      }
    }
});

// Delete (never have to delete posts. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
  Post.findByIdAndRemove({
      _id: req.params.id
    })
    .then(post => {
      res.json({
        post: post,
        message: "Post was removed"
      });
    })
    .catch(err => {
      res.status(404).send({
        message: 'Failed: The post does not exist.',
        error: err
      });
    });
});

module.exports = router;
