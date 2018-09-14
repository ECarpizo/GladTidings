/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Comment = require('../models/Comment');

// Create new Comment
router.route('./create').post((req, res) => {
  let comment = new Comment(req.body);
  comment.save()
    .then(comment => {
      res.status(200).json(comment);
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

// Get all Comments
router.route('').get((req, res) => {
  Comment.find((err, comments) => {
    if (err)
      res.json({
        error: 'Unable to retrieve comments: ' + err
      });
    else
      res.json(comments);
  });
});

// Get Comment by ID
router.route('/getById/:id').get((req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
    if (!comment)
      res.json({
        error: 'Unable to retrieve comments: ' + err
      });
    else
      res.json(comment);
  });
});

// Update Comment info
router.route('/update/:id').put((req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
    if (!comment || err)
      return new Error('Could not load Comment: ' + err);
    else {
        comment.title = req.body.title;
        comment.author = req.body.author;
        comment.pictures = req.body.picture;
        comment.content = req.body.content;
        comment.comments = req.body.comments;
        comment.categories = req.body.categories;
        comment.views = req.body.views;

        comment.save()
        .then(comment => {
          res.json('Comment updated!');
        })
        .catch(err => {
          res.status(400).send('Comment failed to update');
        })
        .catch(err => {
          res.status(500).send('Database error');
        });
    }
  });
});

// Delete (never have to delete comments. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
    Comment.findByIdAndRemove({
    _id: req.params.id
  }, (err, comment) => {
    if (err)
      res.json(err);
    else
      res.json({
        comment: comment,
        message: "Comment was removed"
      });
  });
});

module.exports = router;
