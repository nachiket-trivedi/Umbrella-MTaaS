// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  user_id: String,
  role: String,
  username: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  zipcode: { type: Number},
  city: { type: String },
  state: { type: String },
  address: { type: String },
  about: { type: String },
  bdate: { type: String },
  git_url: String,
  linkedin_url: String,
  experience: String,
  tech: String,
  formids: { type: Array },
  project_involved: [String],
  applied_project:{type:Array},
  rejected_projects:{type:Array}
},
  {
    collection: "user"
  });

var user = mongoose.model("user", userSchema, "user");
// self note-the last parameter tells the mongodb server which collection to use ie useromer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = user;