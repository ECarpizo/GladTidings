//the line below this will get rid of the issues from jshint
/*jshint esversion: 6 */
const express = require('express'),
  router = express.Router();

const User = require('../models/User');

// Create new User
router.route('/create').post((req, res) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Account creation failed',
        error: err
      });
    });
});

// Get all Users
router.route('').get((req, res) => {
  User
    .find()
    .select("_id email password firstName lastName tier active created")
    .exec()
    .then(users => {
      res.status(200).json({
        users: users
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve users',
        error: err
      });
    });
});

// Get User by ID
router.route('/getById/:id').get((req, res) => {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve user: ',
        error: err
      });
    });
});

// Get User by email and password
router.route('/getByCredentials').post((req, res) => {
  User
    .findOne({
      email: req.body.email,
      password: req.body.password
    })
    .exec()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to retrieve users: ',
        error: err
      });
    });
});

// Update User info
router.route('/update/:id').put((req, res) => {
  User
    .update({
      _id: req.params.id
    }, req.body)
    .then(doc => {
      if (!doc)
        return res.status(404).json({
          message: 'Unable to update user',
          error: err
        });
      return User.findById(req.params.id)
        .exec()
        .then(user => {
          res.status(200).json(user);
        });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Unable to update user',
        error: err,
        body: req.body
      });
    });
});

// Delete (never have to delete users. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({
      _id: req.params.id
    })
    .then(user => {
      res.status(200).json({
        user: user,
        message: "User was removed"
      });
    })
    .catch(err => {
      res.status(404).send({
        message: 'Failed: The user does not exist.',
        error: err
      });
    });
});

module.exports = router;
