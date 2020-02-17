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

function returnsGetBugsPromise(pn)
{
    return new Promise((resolve,reject)=>{
        Bug.find({projectname:pn}).then((bugs)=>{
            resolve(bugs.length)
        })
    })
}

getNumberOfBugsForEachProject = (req,res)=>{
    console.log('Inside getNumberOfBugsForEachProject')
    Project.find({manager_email:req.body.email})
    .then((result)=>{
        let projects=[]
        let bugsPromise=[]
        result.forEach((eachProject)=>{
            projects.push(eachProject.projectname)
            bugsPromise.push(returnsGetBugsPromise(eachProject.projectname))
        })
        Promise.all(bugsPromise).then((allData)=>{
            let returnObject = {}
            returnObject['Projects']=projects
            returnObject['NumberOfBugs']=allData
            
            res.json(returnObject)
        })
    }).catch((err)=>{
        console.log('Error in getNumberOfBugsForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

getNumberOfTestersForEachProject = (req,res)=>{
    console.log('Inside getNumberOfTestersForEachProject')
    Project.find({manager_email:req.body.email})
    .then((result)=>{
        let projects=[]
        let numberTesters=[]
        result.forEach((eachProject)=>{
            projects.push(eachProject.projectname)
            numberTesters.push(eachProject.testers_involved.length)
        })
        let returnObject={}
        returnObject['Projects']=projects
        returnObject['NumberOfTesters']=numberTesters
        res.json(returnObject)
    }).catch((err)=>{
        console.log('Error in getNumberOfTestersForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

function returnsFilePromiseAPI(projectname){
    return new Promise(async(resolve,reject)=>{
        let bucketParams={
            Bucket:GlobalVar.AWS_BUCKET_NAME,
            Prefix:projectname+'/'
        }
        var data=await s3.listObjects(bucketParams).promise()
        console.log('----project----'+projectname)
        console.log(data.Contents)
        resolve(data.Contents.length)
    })
}

getNumberOfFilesInS3ForEachProject = (req,res)=>{
    console.log('Inside getNumberOfFilesInS3ForEachProject')
    Project.find({manager_email:req.body.email})
    .then((result)=>{
        let projects=[]
        let filesPromise=[]
        result.forEach((eachProject)=>{
            projects.push(eachProject.projectname)
            filesPromise.push(returnsFilePromiseAPI(eachProject.projectname))
        })
        Promise.all(filesPromise).then((allData)=>{
            let returnObject = {}
            returnObject['Projects']=projects
            returnObject['NumberOfFiles']=allData
            console.log(returnObject)
            res.json(returnObject)
        })
    }).catch((err)=>{
        console.log('Error in getNumberOfFilesInS3ForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

function returnsTotalFileSizePromiseAPI(projectname){
    return new Promise(async(resolve,reject)=>{
        let bucketParams={
            Bucket:GlobalVar.AWS_BUCKET_NAME,
            Prefix:projectname+'/'
        }
        var data=await s3.listObjects(bucketParams).promise()
        console.log('----project----'+projectname)
        console.log(data.Contents)
        let tsize=0
        let obj = {}
        data.Contents.forEach((eachFileObject)=>{
            tsize = tsize + eachFileObject['Size']
        })
        obj['Tsize']=tsize
        obj['Count']=data.Contents.length
        resolve(obj)
    })
}

getSizeOfFilesInS3ForEachProject = (req,res)=>{
    console.log('Inside getSizeOfFilesInS3ForEachProject')
    Project.find({manager_email:req.body.email})
    .then((result)=>{
        let projects=[]
        let filesPromise=[]
        result.forEach((eachProject)=>{
            projects.push(eachProject.projectname)
            filesPromise.push(returnsTotalFileSizePromiseAPI(eachProject.projectname))
        })
        Promise.all(filesPromise).then((allData)=>{
            let returnObject = {}
            returnObject['Projects']=projects
            let psize=[]
            let pcount=[]
            allData.forEach((eachObj)=>{
                psize.push(eachObj['Tsize'])
                pcount.push(eachObj['Count'])
            })
            returnObject['ProjectSize']=psize
            returnObject['ProjectFilesCount']=pcount
            console.log(returnObject)
            res.json(returnObject)
        })
    }).catch((err)=>{
        console.log('Error in getSizeOfFilesInS3ForEachProject: '+err)
        res.status(400).json('Error: '+err)
    })
}


exports.getNumberOfBugsForEachProject = getNumberOfBugsForEachProject
exports.getNumberOfTestersForEachProject = getNumberOfTestersForEachProject
exports.getNumberOfFilesInS3ForEachProject = getNumberOfFilesInS3ForEachProject
exports.getSizeOfFilesInS3ForEachProject = getSizeOfFilesInS3ForEachProject
