var user = require('../models/user');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");
const AWS=require('aws-sdk');
const Project=require('../models/project.model')
const fs = require('fs');
const path = require('path')
var forum = require('../models/forum');

function upload_project_readmeFile(req,s3)
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
    uploadParams.Key = req.body.name + '/' + 'Common/bucket_policy.txt' 

    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload of Readme file success", data.Location);
    }
    });
}

addProject=(req, res, conn, bcrypt)=> {
    const projName=req.body.name
    let slugName=projName.replace(/ /g,'')
    slugName=slugName.toLowerCase();
    let forumObj=new forum({
        forum_slug:slugName,
        forum_name:projName
    })
    forumObj.save()
    .then(()=>{
    forum.find({forum_name:projName},function(err,id)
    {
    let forum_id=id[0]._id
    console.log('yahaha',forum_id)
    let projDataObj=req.body
    console.log('axios req',projDataObj)
    let s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
        secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
        region: GlobalVar.AWS_REGION
      });

    upload_project_readmeFile(req,s3)
    if(req.file)
    {
        console.log('here in the file upload',req.file)
    }
    // Although just accessing the project url gives access denied. Need to entire full url upto the object
    const project_url=GlobalVar.AWS_BASE_URL + req.body.name
    const project_key=req.body.name;
    const projectname=req.body.name
    const manager_email=req.body.email;
    const project_details=projDataObj;
    const newProject=new Project({projectname, project_url, project_key, manager_email, project_details});
    newProject.save()
    .then(()=>{
        user.find({ email: req.body.email }, function(err, results) {
            console.log('result of mongo query',results[0])
            if (err) 
              res.send(err)
            else
            {
                results[0]['project_involved'].push(projectname);
                results[0]['formids'].push(forum_id)
                results[0].save()
                console.log(results[0])
                res.send(JSON.stringify(results[0]));
            }
        });
    }).catch((err)=>{
        res.status(400).json("Error in saving project: "+err);
    })
})
})
}
exports.addProject=addProject;