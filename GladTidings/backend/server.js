const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  db = require('./properties');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Establishing MongoDB Connection
mongoose.connect(db.connection, db.options)
  .then(() => {
      return mongoose.connection;
    },
    (err) => {
      console.log(err);
    });
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open',
  () => {
    console.log('MongoDB connection established');
  },
  err => {
    console.log('Unable to connect to MongoDB: ' + err);
  }
);

// Routes
const userRoutes = require('./routes/user.route');
app.use('/user', userRoutes)

// Establishing Express server connection
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log('Express server running on port ' + port));
