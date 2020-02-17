const Bug=require('../models/bug.model');
const GlobalVar = require("../GlobalVar");
const AWS=require('aws-sdk');

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
    secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
    region: GlobalVar.AWS_REGION
});

// ADMIN GET ALL BUGS FROM ALL TESTER
getAllBugs = (req,res) =>{
    Bug.find()
    .then((bugs)=>{
        res.json(bugs);
    })
    .catch((err)=>{
        res.status(400).json('Error in getAllBugs: '+err);
    })
}

getOneProjectBugs = (req,res)=>{
    console.log('Inside getOneProjectBugs')
    console.log('Getting bugs of user '+req.body.username+' for project '+req.body.projectname)
    Bug.find({username:req.body.username,projectname:req.body.projectname})
    .then((bugs)=>{
        res.json(bugs)
    })
    .catch((err)=>{
        res.status(400).json("Error in getOneProjectBugs: "+err)
    }) 
}

getOneProjectBugsManager = (req,res)=>{
    console.log('Inside getOneProjectBugsManager')
    console.log('Getting all bugs for project '+req.body.projectname)
    Bug.find({projectname:req.body.projectname})
    .then((bugs)=>{
        res.json(bugs)
    })
    .catch((err)=>{
        res.status(400).json("Error in getOneProjectBugsManager: "+err)
    })
}

getAllProjectBugs = (req,res)=>{
    console.log('Inside getAllProjectBugs')
    console.log('Getting all bugs created by tester '+req.body.username)
    Bug.find({username:req.body.username})
    .then((bugs)=>{
        res.json(bugs)
    })
    .catch((err)=>{
        res.status(400).json("Error in getAllProjectBugs: "+err)
    })
}

createBug = (req,res)=>{
    console.log('Inside createBug')
    if(req.file){
        console.log('Script given during bug creation: ',req.file)
        req.body.file_url=req.file.location;
        req.body.file_key=req.file.key;
    }
    console.log(typeof req.body.file_key)
    const username=req.body.username;
    const projectname=req.body.projectname;
    const severity=req.body.severity;
    const hardware=req.body.hardware;
    const version=req.body.version;
    const summary=req.body.summary;
    const date=Date.parse(req.body.date);
    const file_url=req.body.file_url;
    const file_key=req.body.file_key;
    console.log(typeof file_key)

    const newBug=new Bug({username,projectname,severity,hardware,version,summary,file_url,file_key,date});

    newBug.save()
    .then(()=>{
        console.log("Inside then of newBug save")
        res.json("Bug Reported");
    })
    .catch((err)=>{
        console.log("Inside catch of newBug save")
        res.status(400).json("Error in createBug: "+err);
    })
}

//GET a specific bug with id value given in the body of req
//This is the object id that MongoDB gives to each document
getSingleBug = (req,res)=>{
    console.log('Inside getSingleBug')
    //req.body.id gets the value of id directly from url
    Bug.findById(req.body.id)
    .then((bug)=>{
        res.json(bug);
    })
    .catch((err)=>{
        res.status(400).json('Error in getSingleBug: '+err);
    })
}

/*
Deleting the file in s3 specified by file_key
it sends the response to res object itself
Operation is just tag for having meaningful console.log
*/
function deleteFileInAFolder(file_key,req,res,operation)
{
    const params = {
        Bucket:GlobalVar.AWS_BUCKET_NAME,
        Key: file_key //if any sub folder-> path/of/the/folder.ext   
    }
    s3.headObject(params).promise()
    .then(()=>{
        console.log("File Found in S3");
        s3.deleteObject(params).promise()
        .then(()=>{
            console.log("file deleted Successfully");
            res.json('Bug '+ operation + ' with file_key: '+file_key);
        }).catch((err)=>{
            console.log("ERROR in file " + operation+ "ing : " + JSON.stringify(err));
            res.status(400).json('Error: '+err);
        })
    }).catch((err)=>{
        console.log("File not Found ERROR : " + err.code);
        res.status(400).json('Error: '+err);
    })
}

deleteSingleBug = (req,res)=>{
    console.log('Inside deleteSingleBug')
    console.log(req.body)
    //req.body.id gets the value of id directly from req body
    Bug.findByIdAndDelete(req.body.id)
    .then((bug)=>{
        console.log(bug)
        if(bug.file_url!=null)
        {
            deleteFileInAFolder(bug.file_key,req,res,"delete")
        }
        else{
            res.json('Bug deleted: '+bug);
        }
    })
    .catch((err)=>{
        res.status(400).json('Error in deleteSingleBug: '+err);
    })
}

deleteSingleBugFile = (req,res)=>{
    console.log('In deleteBugFile method: '+req.body.id)
    Bug.findById(req.body.id)
    .then((bug)=>{
        console.log("Bug Before found: "+bug)
        let temp_file_key=bug.file_key
        
        bug.file_url=null
        bug.file_key=null
        
        console.log("Bug after: "+bug)

        console.log("Temp file key: "+temp_file_key)

        bug.save().then(()=>{
            console.log("bug saved. deleting the old file")
            deleteFileInAFolder(temp_file_key,req,res,"update")
        }).catch((err)=>{
            res.status(400).json('Unable to delete bug file: '+err);
        })
    }).catch((err)=>{
        res.status(400).json('Unable to find the bug with the given id '+err);
    })
}

updateBug = (req,res)=>{
    console.log('Inside updateBug')
    Bug.findById(req.body.id)
    .then(async(bug)=>{
        console.log("Bug found in db: "+bug)
        if(req.file){
            console.log('The bug being updated has an attached file: '+req.file)
            if(bug.file_url!=null)
            {
                console.log('The bug being updated has previous file to delete')
                console.log("bug.file_key "+bug.file_key)
                console.log("deleting old bug's file from s3")
                const params = {
                    Bucket: GlobalVar.AWS_BUCKET_NAME,
                    Key: bug.file_key //if any sub folder-> path/of/the/folder.ext   
                }
                await s3.headObject(params).promise()
                .then(()=>{
                    console.log("File Found in S3");
                    s3.deleteObject(params).promise()
                    .then(()=>{
                        console.log("file deleted Successfully");
                    }).catch((err)=>{
                        console.log("ERROR in file Deleting : " + JSON.stringify(err));
                    })
                }).catch((err)=>{
                    console.log("File not Found ERROR : " + err.code);
                })
            }
            bug.file_url=req.file.location;
            bug.file_key=req.file.key;
        }
        bug.severity=req.body.severity;
        bug.hardware=req.body.hardware;
        bug.version=req.body.version;
        bug.summary=req.body.summary;
        bug.date=Date.parse(req.body.date);

        console.log("here",bug)

        bug.save().then(()=>{
            res.json('Bug Updated');
        }).catch((err)=>{
            res.status(400).json('Unable to save with new data: '+err);
        })
    })
    .catch((err)=>{
        res.status(400).json('Unable to find the bug with the given id '+err);
    })
}


exports.getAllBugs=getAllBugs
exports.getOneProjectBugs=getOneProjectBugs
exports.getOneProjectBugsManager=getOneProjectBugsManager
exports.getAllProjectBugs=getAllProjectBugs
exports.createBug=createBug
exports.getSingleBug=getSingleBug
exports.deleteSingleBug=deleteSingleBug
exports.deleteSingleBugFile=deleteSingleBugFile
exports.updateBug=updateBug