/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Comment = require('../models/Comment');

// Create new Comment
router.route('/create').post((req, res) => {
  let comment = new Comment(req.body);
  comment.save()
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Comment creation failed',
        error: err
      });
    });
});

// Get all Comments
router.route('').get((req, res) => {
  Comment
    .find()
    .populate('post', '_id')
    .populate('author', 'firstName lastName')
    .exec()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve comments',
        error: err
      });
    });
});

// Get Comment by ID
router.route('/getById/:id').get((req, res) => {
  Comment
    .findById(req.params.id)
    .populate('author', 'firstName lastName')
    .populate('post', '_id')
    .exec()
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve comment: ',
        error: err
      });
    });
});

// Get Comments by user ID
router.route('/getByUser/:id').get((req, res) => {
  Comment
    .find({
      author: req.params.id
    })
    .populate('author', 'firstName lastName')
    .populate('post', '_id')
    .exec()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve comments: ',
        error: err
      });
    });
});

// Update Comment info
router.route('/update/:id').put((req, res) => {
  Comment
    .update({
      _id: req.params.id
    }, req.body)
    .then(doc => {
      if (!doc)
        return res.status(404).json({
          message: 'Unable to update comment',
          error: err
        });
      return Comment
        .findById(req.params.id)
        .populate('author')
        .populate('post', '_id')
        .exec()
        .then(comment => {
          res.status(200).json(comment);
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Unable to update comment',
        error: err,
        body: req.body
      });
    });
});

// Delete (never have to delete comments. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
  Comment
    .findByIdAndRemove({
      _id: req.params.id
    })
    .then(comment => {
      res.json({
        comment: comment,
        message: "Comment was removed"
      });
    })
    .catch(err => {
      res.status(404).send({
        message: 'Failed: The comment does not exist.',
        error: err
      });
    });
});

module.exports = router;
