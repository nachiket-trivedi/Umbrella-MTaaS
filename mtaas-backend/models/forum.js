/**
 * forum model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const forumSchema = mongoose.Schema({
var forumSchema = new Schema({
  forum_slug: String,
  forum_name: String,
},
  {
    collection: "forum"
  });

module.exports = mongoose.model('forum', forumSchema);
