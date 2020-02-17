var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var announcement = require("../models/announcement");
var Project=require('../models/project.model')

router.post("/sendAnnouncement", function(req, res) {
  console.log("Inside send Announcement ");
  console.log(req.body);
  var ann = announcement({
    message: req.body.announcementBody,
    manager: req.body.manager,
    managerEmail: req.body.managerEmail,
    project: req.body.announcementProject,
    projectID:req.body.projectID
  });
  ann.save(function(err) {
    if (err) {
      res.end("Couldn't send Announcement!");
    } else {
      res.end("Announcement Sent!");
    }
  });
});

router.post("/getTesterAnnouncement", function(req, res) {
  console.log("Inside get Tester Announcement ");
  console.log(req.body);
 Project.find({testers_involved:req.body.email},async function(err, result, fields) {
    if (err) throw err;
    console.log(result)
var proj=[];
result.map(item=>{
    proj.push(item._id)
})
console.log("Hola Amigos")
console.log(proj)
  await announcement.find(
    {
      $and: [
        { projectID: {$in:proj} },
        { removed: { $nin: [req.body.email] } }
      ]
    },
    function(err, result, fields) {
      if (err) throw err;

      console.log(result);
      res.end(JSON.stringify(result));
    }
  );
 })
});

router.post("/getManagerAnnouncement", function(req, res) {
  console.log("Inside get Manager Announcement ");
  console.log(req.body);
  announcement.find(
    {
      $and: [
        { managerEmail: req.body.email },
        { removed: { $nin: [req.body.email] } }
      ]
    },
    function(err, result, fields) {
      if (err) throw err;

      console.log(result);
      res.end(JSON.stringify(result));
    }
  );
});

router.post("/removeAnnouncement", function(req, res) {
  console.log("Inside get Manager Announcement ");
  console.log(req.body);
  announcement.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { removed: req.body.email } },
    function(err, result, fields) {
      if (err) {
        res.end("Unable to Remove");
      } else {
        console.log(result);
        res.end("Removed Announcement from Feed");
      }
    }
  );
});

module.exports = router;
