/**
 * discussion model
 */
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const discussionSchema = new Schema({
  forum_id: mongoose.Schema.ObjectId,
  forum: { type: mongoose.Schema.ObjectId, ref: 'forum' },
  discussion_slug: String,
  user_id: mongoose.Schema.ObjectId,
  user: { type: mongoose.Schema.ObjectId, ref: 'user' },
  date: Date,
  title: String,
  content: Object,
  favorites: Array,
  tags: Array,
  pinned: Boolean,
}, {
  collection: "discussion"
});

module.exports = mongoose.model('discussion', discussionSchema);
