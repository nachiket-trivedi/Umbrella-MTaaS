var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var Project=require('../models/project.model')

router.post('/getProjects',function(req,res){
  console.log("Inside get Projects ");  
  console.log(req.body);
  Project.find({manager_email:req.body.email}, function(err,result,fields){
            if(err) throw err;
           console.log(result)
            let a=[]
            for(var i=0;i<result.length;i++){
              a.push({"key" : result[i]._id,"value" :result[i].project_key} )
            }
  
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        });
    res.end(JSON.stringify(a));  
    })
})

module.exports = router;