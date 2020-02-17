/**
 * opinion model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const opinionSchema = mongoose.Schema({
const opinionSchema = new Schema({
  forum_id: mongoose.Schema.ObjectId,
  forum: { type: mongoose.Schema.ObjectId, ref: 'forum' },
  discussion_id: mongoose.Schema.ObjectId,
  discussion: { type: mongoose.Schema.ObjectId, ref: 'discussion' },
  user_id: mongoose.Schema.ObjectId,
  user: { type: mongoose.Schema.ObjectId, ref: 'user' },
  date: Date,
  content: Object,
}, {
  collection: "opinion"
});

module.exports = mongoose.model('opinion', opinionSchema);
