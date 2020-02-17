/**
 * user model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  email: String,
  name: String,
  phone: String,
  zipcode: String,
  role: { type: String, default: 'Tester' }, // ['admin', 'moderator', 'user']
  formids: Array,
},
  {
    collection: "user"
  });

module.exports = mongoose.model('user', UserSchema);

