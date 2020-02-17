const Bug=require('../models/bug.model')
const User=require('../models/user')
const Project=require('../models/project.model')
const AWS=require('aws-sdk')
const GlobalVar = require("../GlobalVar")

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
    secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
    region: GlobalVar.AWS_REGION
})

function returnsBugPromise(projectName,userName)
{
    return new Promise((resolve,reject)=>{
        Bug.find({projectname:projectName,username:userName})
        .then((bugs)=>{
            resolve(bugs.length)
        })
    })
}

getNumberOfBugsForEachProject = (req,res)=>{
    console.log('Inside getNumberOfBugsForEachProject')
    User.findOne({email:req.body.email,role:'Tester'})
    .then((user)=>{
        let projects=[]
        let bugPromise=[]
        user.project_involved.forEach((project)=>{
            projects.push(project)
            bugPromise.push(returnsBugPromise(project,user.email))
        })
        Promise.all(bugPromise).then((allData)=>{
            let result_object={}
            result_object['Projects']=projects
            result_object['NumberOfBugs']=allData
            console.log(result_object)
            res.json(result_object)
        })
    }).catch((err)=>{
        console.log('Error in getNumberOfBugsForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

function returnsFilePromiseAPI(projectname,username){
    return new Promise(async(resolve,reject)=>{
        let bucketParams={
            Bucket:GlobalVar.AWS_BUCKET_NAME,
            Prefix:projectname+'/'+username+'/'
        }
        var data=await s3.listObjects(bucketParams).promise()
        resolve(data.Contents.length)
    })
}

getNumberOfFilesInS3ForEachProject = (req,res)=>{
    console.log('Inside getNumberOfFilesInS3ForEachProject')
    User.findOne({email:req.body.email,role:'Tester'})
    .then((user)=>{
        let projects=[]
        let filesPromise=[]
        user.project_involved.forEach((project)=>{
            projects.push(project)
            filesPromise.push(returnsFilePromiseAPI(project,user.email))
        })
        Promise.all(filesPromise).then((allData)=>{
            let result_object={}
            result_object['Projects']=projects
            result_object['NumberOfFiles']=allData
            console.log(result_object)
            res.json(result_object)
        })
    }).catch((err)=>{
        console.log('Error in getNumberOfFilesInS3ForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

exports.getNumberOfBugsForEachProject = getNumberOfBugsForEachProject
exports.getNumberOfFilesInS3ForEachProject = getNumberOfFilesInS3ForEachProject