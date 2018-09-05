const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

const connection = '';
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
}

mongoose.connection.on('connected', function() {
  // Hack the database back to the right one, because when using mongodb+srv as protocol.
  if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
      mongoose.connection.db = mongoose.connection.client.db('GladTidings');
  }
  console.log('Connection to MongoDB established.')
});

mongoose.connect(connection, options)
  .then(() => {
      console.log('Mongoose established a connection with MongoDB');
    },
    err => {
      console.log('Unable to connect to DB: ' + err);
    });

module.exports = connection;
// flag to check for existing DB connection
// mongoose.Promise = global.Promise;
// let isConnected;

// module.exports = connectToDatase = () => {
//   if (isConnected) {
//     console.log('=> sing existing database connection');
//     return Promise.resolve();
//   }
//   console.log('=> using new database connection');
//   return MongoClient.connect(connection, options)
//     .then(() => {
//         console.log('MongoClient established connection');
//         isConnected = true;
//         return mongoose.connection;
//       },
//       (err) => {
//         console.log(err);
//       });
// };



// module.exports = {
//     // connection: '',
//     //replace <PASSWORD> with your password
//     connection: '',
//     options: {
//         useNewUrlParser: true,
//         reconnectTries: Number.MAX_VALUE,
//         poolSize: 10
//     }
//     // auth: {
//     //     user: '',
//     //     password: ''
//     // }
// };
