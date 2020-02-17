// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var announcementSchema = new Schema({
  message: { type: String },
  managerEmail:{type: String},
  manager: { type: String },
  project: { type: String },
  date:{type: Date, default: Date.now},
  removed:{type: Array},
  projectID:{ type: String }
},
  {
    collection: "announcement"
  });

var announcements = mongoose.model("announcement", announcementSchema, "announcement");
// self note-the last parameter tells the mongodb server which collection to use ie useromer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = announcements;