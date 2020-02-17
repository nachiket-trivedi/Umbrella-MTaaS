var user = require('../models/user');
const AWS=require('aws-sdk');
const Project=require('../models/project.model')
const fs = require('fs');
const path = require('path')
var forum = require('../models/forum');

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");


let resArr=[]
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }


rejectTester=(req, res, conn, bcrypt)=> {
    let project_key=req.body.project_key;
    let email=req.body.email;
    let testerEmail=req.body.testerEmail
    let forumId=0

        user.find({ email: testerEmail },function(err, results) {
        console.log('result of mongo query',results[0])
        if (err) 
          res.send(err)
        else
        {
          console.log('before',results[0])
          let applied_project=results[0]['applied_project'] 
          let index=applied_project.indexOf(project_key)
          applied_project.splice(index,1);
          results[0]['applied_project']=applied_project
          results[0]['rejected_projects'].push(project_key)
          results[0]['rejected_projects']=results[0]['rejected_projects'].filter(onlyUnique)
          console.log('results',results[0])
          results[0].save()
          console.log(project_key)
          Project.find({projectname:project_key}, function(err,result){
            console.log("ksugd")
            console.log('before-',result[0])
            let pending_testers=result[0]['pending_testers'] 
            let index=pending_testers.indexOf(testerEmail)
            pending_testers.splice(index,1);
            result[0]['pending_testers']=pending_testers
            result[0]['testers_rejected'].push(testerEmail)
            result[0]['testers_rejected']=result[0]['testers_rejected'].filter(onlyUnique)
            result[0].save()
            console.log('result-',result[0])
        })
        }
        res.end();
    })
}
exports.rejectTester=rejectTester;