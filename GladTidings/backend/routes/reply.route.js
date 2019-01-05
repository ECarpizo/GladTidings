/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const Reply = require('../models/Reply');

// Create new Reply
router.route('/create').post((req, res) => {
  let reply = new Reply(req.body);
  reply.save()
    .then(reply => {
      res.status(200).json(reply);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Reply creation failed',
        error: err
      });
    });
});

// Get all Replies
router.route('').get((req, res) => {
  Reply
    .find()
    .populate('replyTo', '_id')
    .populate('author', 'firstName lastName')
    .exec()
    .then(replies => {
      res.status(200).json(replies);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve replies',
        error: err
      });
    });
});

// Get Reply by ID
router.route('/getById/:id').get((req, res) => {
  Reply
    .findById(req.params.id)
    .populate('author', 'firstName lastName')
    .populate('replyTo', '_id')
    .exec()
    .then(reply => {
      res.status(200).json(reply);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve reply: ',
        error: err
      });
    });
});

// Get Replies by user ID
router.route('/getByUser/:id').get((req, res) => {
  Reply
    .find({
      author: req.params.id
    })
    .populate('author', 'firstName lastName')
    .populate('replyTo', '_id')
    .exec()
    .then(replies => {
      res.status(200).json(replies);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve replies: ',
        error: err
      });
    });
});

// Update Reply info
router.route('/update/:id').put((req, res) => {
  Reply
    .update({
      _id: req.params.id
    }, req.body)
    .then(doc => {
      if (!doc)
        return res.status(404).json({
          message: 'Unable to update reply',
          error: err
        });
      return Reply
        .findById(req.params.id)
        .populate('author')
        .populate('replyTo', '_id')
        .exec()
        .then(reply => {
          res.status(200).json(reply);
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Unable to update reply',
        error: err,
        body: req.body
      });
    });
});

// Delete (never have to delete replies. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
  Reply
    .findByIdAndRemove({
      _id: req.params.id
    })
    .then(reply => {
      res.json({
        reply: reply,
        message: "Reply was removed"
      });
    })
    .catch(err => {
      res.status(404).send({
        message: 'Failed: The reply does not exist.',
        error: err
      });
    });
});

module.exports = router;
