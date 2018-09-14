/*jshint esversion: 6 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Want to eventually separate the mongoose code into a separate file
// and import it. Currently don't know how to.
// const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/*  MONGODB Connection
 MongoDB Atlas URI
 const uri = 'mongodb+srv://<Username>:<Password>@<Hostname>.mongodb.net/<DB name>?retryWrites=true';
 replace <Username> with your desired database role username>
 replace <Password> with the password for that DB username
 Replace <Hostname> with your DB hostname
 Replace <DB name> with the DB name
*/
const uri = '';
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};
mongoose.connect(uri, options);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


// API routes
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const categoryRoutes = require('./routes/category.route');
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);

// Node server connection
const port = process.env.PORT || 4000;
app.listen(4000, () => console.log('Express server running at http://localhost:'+port));