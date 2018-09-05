/*jshint esversion: 6 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// db = require('./config/db');
const User = require('./models/User');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// const MongoClient = require('mongodb').MongoClient;

const connection = 'mongodb+srv://user:pass@hostname/dbName?retryWrites=true';
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  dbName: 'GladTidings'
};

mongoose.connect(connection, options)
  .then(() => {
      console.log('Mongoose established a connection with MongoDB');
    },
    err => {
      console.log('Unable to connect to DB: ' + err);
    });

// mongoose.connection.on('connected', function () {
//   // Hack the database back to the right one, because when using mongodb+srv as protocol.
//   if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
//     mongoose.connection.db = mongoose.connection.client.db('GladTidings');
//   }
//   console.log('Connection to MongoDB established.')
// });

// API Endpoints
// const userRoutes = require('./routes/user.route');
// app.use('/user', userRoutes);

// Create new User
router.route('/users/create').post((req, res) => {
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
router.route('/users').get((req, res) => {
  User.find((err, users) => {
    if (err)
      res.json({
        error: 'Unable to retrieve users: ' + err
      });
    else
      res.json(users);
  });
});

// Get User by ID
router.route('/users/:id').get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      res.json({
        error: 'Unable to retrieve users: ' + err
      });
    else
      res.json(user);
  });
});

// Get User by email and password
router.route('/users/getByCredentials').post((req, res) => {
  User.findOne({
    email: req.params.email,
    password: req.params.password
  }, (err, user) => {
    if (err)
      res.json({
        message: "User does not exist",
        error: err
      });
    else
      res.json(user);
  });
});

// Update User info
router.route('/users/update/:id').put((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user || err)
      return new Error('Could not load User: ' + err);
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
router.route('/users/delete/:id').get(function (req, res) {
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

app.use('/', router);

// Establishing Express server connection
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Express server running at http://localhost:${port}`));
