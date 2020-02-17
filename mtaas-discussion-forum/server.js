
// modules for server
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


// server configurations
const serverConfigs = require('./config/serverConfig');

// connect to database
// mongoose.connect(serverConfigs.DBURL);
console.log(serverConfigs.DBURL);
mongoose.connect(serverConfigs.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  })

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);

// fire up the server
app.listen(serverConfigs.PORT, (error) => {
  if (error) throw error;
  console.log('Server running on port: ' + serverConfigs.PORT);
});
