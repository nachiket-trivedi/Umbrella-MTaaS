/**
 * user model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TesterSchema = new Schema({
    username: String,
    email: String,
    name: String,
    phone: String,
    zipcode: String,
    role: { type: String, default: 'Tester' }, // ['admin', 'moderator', 'user']
    formids: Array,
},
    {
        collection: "Tester"
    });

module.exports = mongoose.model('Tester', TesterSchema);
