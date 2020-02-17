var user = require('../models/user');
var Project=require('../models/project.model')

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
applyForProject=(req, res, conn, bcrypt)=> {
  let manager_email=req.body.manager_email;
  let project_key=req.body.project_key;
  let email=req.body.email;
    user.find({email:req.body.email}, function(err, results) {
        console.log('result of mongo query',results)
        if (err) 
          res.send(err)
        else
        {
          results[0]['applied_project'].push(project_key)
        }
        results[0]['applied_project']= results[0]['applied_project'].filter( onlyUnique );
        results[0].save()
      });
    console.log('project_key')
    Project.find({project_key:project_key},function(err,results){
      console.log('results')
      results[0]['pending_testers'].push(email)
      results[0]['pending_testers']=results[0]['pending_testers'].filter(onlyUnique)
      results[0].save()
      res.send(results)
    })
}
exports.applyForProject=applyForProject;