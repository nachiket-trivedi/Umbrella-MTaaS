/**
 * user model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
// const userSchema = mongoose.Schema({
var ManagerSchema = new Schema({
    username: String,
    email: String,
    name: String,
    phone: String,
    zipcode: String,
    role: { type: String, default: 'Manager' }, // ['admin', 'moderator', 'user']
    formids: Array,
},
    {
        collection: "Manager"
    });

module.exports = mongoose.model('Manager', ManagerSchema);
