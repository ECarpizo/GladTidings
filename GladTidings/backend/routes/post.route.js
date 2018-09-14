/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Post = require('../models/Post');

// Create new comment
router.route('./create').post((req, res) => {
  let post = new Post(req.body);
  post.save()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(400).send({
        "message": 'Account creation failed',
        "error": err
      });
    })
    .catch(err => {
      res.status(500).send({
        "message": 'Database error',
        "error": err
      });
    });
});

// Get all comments
router.route('').get((req, res) => {
  Post.find((err, posts) => {
    if (err)
      res.json({
        error: 'Unable to retrieve comments: ' + err
      });
    else
      res.json(posts);
  });
});

// Get comment by ID
router.route('/getById/:id').get((req, res) => {
    Post.findById(req.params.id, (err, post) => {
    if (!post)
      res.json({
        error: 'Unable to retrieve comments: ' + err
      });
    else
      res.json(post);
  });
});

// Update comment info
router.route('/update/:id').put((req, res) => {
    Post.findById(req.params.id, (err, post) => {
    if (!post || err)
      return new Error('Could not load Post: ' + err);
    else {
        post.title = req.body.title;
        post.author = req.body.author;
        post.pictures = req.body.picture;
        post.content = req.body.content;
        post.comments = req.body.comments;
        post.categories = req.body.categories;
        post.views = req.body.views;

        post.save()
        .then(post => {
          res.json('Post updated!');
        })
        .catch(err => {
          res.status(400).send('Post failed to update');
        })
        .catch(err => {
          res.status(500).send('Database error');
        });
    }
  });
});

// Delete (never have to delete posts. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({
    _id: req.params.id
  }, (err, post) => {
    if (err)
      res.json(err);
    else
      res.json({
        post: post,
        message: "Post was removed"
      });
  });
});

module.exports = router;
