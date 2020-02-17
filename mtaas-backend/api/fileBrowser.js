const AWS=require('aws-sdk');
const User=require('../models/user');
const Bug=require('../models/bug.model')
const GlobalVar = require("../GlobalVar");

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
    secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
    region: GlobalVar.AWS_REGION
});

adminGET = (req,res)=>{
    console.log('In adminGet')
    const bucketParams={
        Bucket:GlobalVar.AWS_BUCKET_NAME
    }
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error in fetching contents of Bucket: "+err);
            res.status(400).json("Error in fetching contents of Bucket: "+err)
        } else {
            let files=[]
            files=data.Contents.map((each)=>{
                return {
                    key:each.Key,
                    modified:each.LastModified,
                    size:each.Size,
                    file_url:GlobalVar.AWS_BASE_URL+each.key
                }
            })
            res.json(files)
        }
    });
}

testerOneProjectFiles = (req,res)=>{
    console.log('In testerOneProjectFiles')
    let bucketParams={
        Bucket:GlobalVar.AWS_BUCKET_NAME,
        Prefix:req.body.projectname+'/Common/'
    }
    let files=[]
    //for common files
    s3.listObjects(bucketParams,function(err,data){
        if (err) {
            console.log("Error in fetching contents of Bucket: "+err);
            res.status(400).json("Error in fetching contents of Bucket: "+err)
        } else {
            let common_files=[]
            common_files=data.Contents.map((each)=>{
                return {
                    key:each.Key,
                    modified:each.LastModified,
                    size:each.Size,
                    file_url:GlobalVar.AWS_BASE_URL+each.Key
                }
            })
            files.push(...common_files)
            console.log(files)

            bucketParams={
                Bucket:GlobalVar.AWS_BUCKET_NAME,
                Prefix:req.body.projectname+'/'+req.body.username+'/'
            }
            //for user files
            s3.listObjects(bucketParams,function(err,data){
                if (err) {
                    console.log("Error in fetching contents of Bucket: "+err);
                    res.status(400).json("Error in fetching contents of Bucket: "+err)
                } else {
                    let user_files=[]
                    user_files=data.Contents.map((each)=>{
                        return {
                            key:each.Key,
                            modified:each.LastModified,
                            size:each.Size,
                            file_url:GlobalVar.AWS_BASE_URL+each.Key
                        }
                    })
                    files.push(...user_files)
                    console.log('Files array after user files push')
                    console.log(files)
                    res.json(files)
                }
            })
        }
    })
}

testerAllProjectFiles = (req,res)=>{
    console.log('In testerAllProjectFiles')
    User.findOne({username:req.body.username})
    .then(async(user)=>{
        let projects=user.project_involved
        let bucketParams={}
        let all_files=[]
        for(var i=0;i<projects.length;i++)
        {
            let project=projects[i]
            bucketParams={
                Bucket:GlobalVar.AWS_BUCKET_NAME,
                Prefix:project+'/Common/'
            }
            var data=await s3.listObjects(bucketParams).promise()
            let common_files=[]
            common_files=data.Contents.map((each)=>{
                return {
                    key:each.Key,
                    modified:each.LastModified,
                    size:each.Size,
                    file_url:GlobalVar.AWS_BASE_URL+each.Key
                }
            })
            all_files.push(...common_files)

            bucketParams={
                Bucket:GlobalVar.AWS_BUCKET_NAME,
                Prefix:project+'/'+req.body.username+'/'
            }
            var data=await s3.listObjects(bucketParams).promise()
            let user_files=[]
            user_files=data.Contents.map((each)=>{
                return {
                    key:each.Key,
                    modified:each.LastModified,
                    size:each.Size,
                    file_url:GlobalVar.AWS_BASE_URL+each.Key
                }
            })
            all_files.push(...user_files)
        }
        res.json(all_files)
    }).catch((err)=>{
        res.status(400).json("Error in finding the user: "+err);
    })
}

deleteFile = async(req,res)=>{
    const bucketParams={
        Bucket:GlobalVar.AWS_BUCKET_NAME,
        Key:req.body.file_key
    }
    try {
        await s3.headObject(bucketParams).promise()
        console.log("File Found in S3")
        try {
            await s3.deleteObject(bucketParams).promise()
            console.log("file deleted from s3 Successfully")
            let newBug=await Bug.findOneAndUpdate({file_key:req.body.file_key},{file_key:null,file_url:null},{
                new:true
            });
            res.json('File Deleted Successfully')
        }
        catch (err) {
            console.log("ERROR in file Deleting : " + err)
            res.status(400).json("ERROR in file Deleting : " + err)
        }
    } 
    catch (err) {
        console.log("File not Found ERROR : " + err)
        res.status(400).json("File not Found ERROR : " + err)
    }
}

managerOneProjectFiles = async(req,res)=>{
    let bucketParams={
        Bucket:GlobalVar.AWS_BUCKET_NAME,
        Prefix:req.body.projectname+'/'
    }
    var data=await s3.listObjects(bucketParams).promise()
    let project_files=[]
    project_files=data.Contents.map((each)=>{
        return {
            key:each.Key,
            modified:each.LastModified,
            size:each.Size,
            file_url:GlobalVar.AWS_BASE_URL+each.Key
        }
    })
    res.json(project_files)
}


exports.adminGET=adminGET
exports.testerOneProjectFiles=testerOneProjectFiles
exports.testerAllProjectFiles=testerAllProjectFiles
exports.deleteFile=deleteFile
exports.managerOneProjectFiles=managerOneProjectFiles