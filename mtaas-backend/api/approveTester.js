var user = require('../models/user');
const AWS=require('aws-sdk');
const Project=require('../models/project.model')
const fs = require('fs');
const path = require('path')
var forum = require('../models/forum');

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
  secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
  region: GlobalVar.AWS_REGION
});

let resArr=[]
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }


function upload_project_readmeFile(req,res)
{
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket: GlobalVar.AWS_BUCKET_NAME, Key: '', Body: ''};
    var file = path.join(__dirname, '..', 'files', 'bucket_policy.txt');

    // Configure the file stream and obtain the upload parameters
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = req.body.project_key + '/' + req.body.testerEmail + '/folder_policy.txt'
    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error in creating user's folder in S3", err);
    } if (data) {
        console.log("User's folder created in S3", data.Location);
      }
    });
}

approveTester=(req, res, conn, bcrypt)=> {
    let project_key=req.body.project_key;
    let email=req.body.email;
    let testerEmail=req.body.testerEmail
    let forumId=0
    forum.find({forum_name:project_key},function(err,id)
    {
        console.log('-->',id[0])
        if(id[0]!=undefined)
            forumId=id[0]._id
        user.find({ email: testerEmail },function(err, results) {
        console.log('result of mongo query',results[0])
        if (err) 
          res.send(err)
        else
        {
          upload_project_readmeFile(req,res)
          console.log('before',results[0])
          let applied_project=results[0]['applied_project'] 
          let index=applied_project.indexOf(project_key)
          applied_project.splice(index,1);
          results[0]['applied_project']=applied_project
          results[0]['project_involved'].push(project_key)
          results[0]['project_involved']=results[0]['project_involved'].filter(onlyUnique)
          if(forumId!=0)
            results[0]['formids'].push(forumId);
          results[0].save()
          console.log('results',results[0])
          console.log(project_key)
          Project.find({projectname:project_key}, function(err,result){
            console.log("ksugd")
            console.log('before-',result[0])
            let pending_testers=result[0]['pending_testers'] 
            let index=pending_testers.indexOf(testerEmail)
            pending_testers.splice(index,1);
            result[0]['pending_testers']=pending_testers
            result[0]['testers_involved'].push(testerEmail)
            result[0]['testers_involved']=result[0]['testers_involved'].filter(onlyUnique)
            result[0].save()
            console.log('result-',result[0])
        })
        }
        res.end();
    })
      });


}
exports.approveTester=approveTester;