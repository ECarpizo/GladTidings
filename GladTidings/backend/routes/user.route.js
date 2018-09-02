const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

let User = require('../schemas/User');

// Create new User
router.route('/create').post((req, res) => {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({
        'user': 'Account created!'
      });
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

// Get all Users
router.route('/getAll').get((req, res) => {
  User.find((err, users) => {
    if (err)
      res.json({
        error: 'Unable to retrieve users'
      });
    else
      res.json(users);
  });
});

// Get User by ID
router.route('/getById/:id').get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(err);
    else
      res.json(user);
  });
});

// Get User by email and password
router.route('/getByCredentials').post((req, res) => {
  User.findOne({
    email: req.params.email,
    password: res.params.password
  }, (err, user) => {
    if (err)
      res.json(500, {
        message: "User does not exist",
        error: err
      });
    else
      res.json(user);
  });
});

// Update User info
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load User'));
    else {
      user._id = new mongoose.Types.ObjectId();
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.tier = req.body.tier;
      user.active = req.body.active;

      user.save()
        .then(user => {
          res.json('Account updated!');
        })
        .catch(err => {
          res.status(400).send('Account failed to update');
        })
        .catch(err => {
          res.status(500).send('Database error');
        });
    }
  });
});

// Delete (never have to delete users. Just disable active status to "false")
router.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({
    _id: req.params.id
  }, (err, user) => {
    if (err)
      res.json(err);
    else
      res.json({
        user: user,
        message: "User was removed"
      });
  });
});

module.exports = router;
