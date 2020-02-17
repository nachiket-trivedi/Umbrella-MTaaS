let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME
// const connectionString='mongodb+srv://nachi:Merc6325@grubhubcluster-y5tjr.mongodb.net/MTaaSDB?retryWrites=true&w=majority'
const connectionString = 'mongodb+srv://admin:admin@discussion-kaxio.mongodb.net/test?retryWrites=true&w=majority';
class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database()