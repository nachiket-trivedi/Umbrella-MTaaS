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

getNumberOfWorkingTesterPerProject = (req,res)=>{
    console.log('Inside getNumberOfWorkingTesterPerProject')
    Project.find({},function(err,results){
        if (err)
        {
            console.log('Error in getNumberOfWorkingTesterPerProject: '+err)
            res.status(400).json('Error in fetching all project details: '+err)
        }
        else
        {
            let project_names=[]
            let count_working_tester=[]
            let count_pending_tester=[]
            results.forEach((eachProject)=>{
                project_names.push(eachProject.projectname)
                count_working_tester.push(eachProject.testers_involved.length)
                count_pending_tester.push(eachProject.pending_testers.length)
            })
            let return_object={}
            return_object['Projects'] = project_names
            return_object['NumberWorkingTester'] = count_working_tester
            return_object['NumberPendingTester'] = count_pending_tester
            console.log('Return Object from getNumberOfWorkingTesterPerProject :'+return_object)
            res.send(return_object)
        }
    })
}

getNumberOfTesterManager = (req,res)=>{
    console.log('Inside getNumberOfTesterManager')
    User.find()
    .then((results)=>{
        let tc=0,mc=0
        results.forEach((each)=>{
            if(each['role']==='Manager'){
                mc=mc+1
            }
            else if(each['role']==='Tester'){
                tc=tc+1
            }
        })
        let return_object={}
        return_object['Users'] = ['Tester','Manager']
        return_object['Counts'] = [tc,mc]
        res.json(return_object)
    }).catch((err)=>{
        console.log('Error in fetching all user details: '+err)
        res.status(400).json('Error in fetching all user details: '+err)
    })
}

getProjectTesterRuleBasedCount = (req,res)=>{
    console.log('Inside getProjectTesterRuleBasedCount')
    Project.find()
    .then((results)=>{
        let lowc=0,midc=0,highc=0
        results.forEach((eachProject)=>{
            if(eachProject.testers_involved.length <= 3){
                lowc++
            }
            else if((eachProject.testers_involved.length > 3) && (eachProject.testers_involved.length <= 8))
            {
                midc++
            }
            else{
                highc++
            }
        })
        let result_object={}
        result_object['Division'] = ['0-3 Testers','4-8 Testers','>8 Testers']
        result_object['counts'] = [lowc,midc,highc]
        console.log(result_object)
        res.json(result_object)
    }).catch((err)=>{
        console.log('Error in fetching all project details: '+err)
        res.status(400).json('Error in fetching all project details: '+err)
    })
}

function returnsFilePromiseAPI(projectname){
    return new Promise(async(resolve,reject)=>{
        let bucketParams={
            Bucket:GlobalVar.AWS_BUCKET_NAME,
            Prefix:projectname+'/'
        }
        var data=await s3.listObjects(bucketParams).promise()
        //console.log(data.Contents)
        resolve(data.Contents.length)
    })
}

getCountS3FilesPerProject = (req,res)=>{
    console.log('Inside getCountS3FilesPerProject')
    Project.find()
    .then((projects)=>{
        let projectsarr=[]
        let filesPromise=[]
        projects.forEach((eachProject)=>{
            projectsarr.push(eachProject.projectname)
            filesPromise.push(returnsFilePromiseAPI(eachProject.projectname))
        })
        Promise.all(filesPromise).then((allData)=>{
            let result_object={}
            result_object['Projects']=projectsarr
            result_object['NumberOfFiles']=allData
            console.log(result_object)
            res.json(result_object)
        })
    }).catch((err)=>{
        console.log('Error in getCountS3FilesPerProject: '+err)
        res.status(400).json('Error: '+err)
    })
}

exports.getNumberOfWorkingTesterPerProject = getNumberOfWorkingTesterPerProject
exports.getNumberOfTesterManager = getNumberOfTesterManager
exports.getProjectTesterRuleBasedCount = getProjectTesterRuleBasedCount
exports.getCountS3FilesPerProject = getCountS3FilesPerProject