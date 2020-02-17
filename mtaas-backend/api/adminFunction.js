const AWS = require('aws-sdk');
const Bug = require('../models/bug.model')
const User = require('../models/user');
const Project = require('../models/project.model')

const Forum = require('../models/forum')
const Discussion = require('../models/discussion.model')
const Opinion = require('../models/opinion.model')

const GlobalVar = require("../GlobalVar");

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: GlobalVar.AWS_ACCESS_KEY_ID,
    secretAccessKey: GlobalVar.AWS_SECRET_ACCESS_KEY,
    region: GlobalVar.AWS_REGION
});


getAllUser = (req, res) => {
    console.log('Inside getAllUser')
    User.find()
        .then((result) => {
            console.log(result)
            res.json(result)
        }).catch((err) => {
            console.log('Error in fetching all user details: ' + err)
            res.status(400).json('Error in fetching all user details: ' + err)
        })
}

//delete a folder requires deleting all the files in it
async function emptyAndDeleteFolderOfBucket(project) {

    const listParams = {
        Bucket: GlobalVar.AWS_BUCKET_NAME,
        Prefix: project.project_key
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: GlobalVar.AWS_BUCKET_NAME,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyAndDeleteFolderOfBucket(process.argv[2], process.argv[3]);
}

function returnsBugDeleteAPIPromise(bug_id) {
    return new Promise((resolve, reject) => {
        Bug.findByIdAndDelete(bug_id).
            then((bug) => {
                resolve(bug)
            })
    })
}

function returnsTesterProjectsInvolvedUpdatePromise(userName, projectName) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: userName })
            .then(async (user) => {
                let ptemp = user.project_involved
                let pidx = ptemp.indexOf(projectName)
                ptemp.splice(pidx, 1)
                await user.save()
                return user
            }).then((user) => {
                resolve(user)
            })
    })
}

const deleteForum = (forum_id) => {
    console.log('delete forum called---')
    console.log(forum_id)
    return new Promise((resolve, reject) => {
        // first remove any discussion regarding the forum

        Discussion.remove({ "forum_id": forum_id }).exec((error) => {
            if (error) { console.log(error); reject({ deleted: false }); }
            else {
                // remove any opinion regarding the forum
                Opinion.remove({ "forum_id": forum_id }).exec((error) => {
                    if (error) { console.log(error); reject({ deleted: false }); }
                    else {
                        // now we can remove the forum
                        Forum.remove({ "_id": forum_id }).exec((error) => {
                            if (error) { console.log(error); reject({ deleted: false }); }
                            else { resolve({ deleted: true }); }
                        });
                    }
                });
            }
        });
    });
};

deleteProject = (req, res) => {
    console.log('Inside Admin deleteProject')
    Project.findOneAndDelete({projectname:req.body.projectname})
        .then(async (project) => {
            await emptyAndDeleteFolderOfBucket(project)
            Bug.find({ projectname: project.projectname }).then((bugs) => {
                let bugDelRequests = []
                bugs.forEach((bug) => {
                    bugDelRequests.push(returnsBugDeleteAPIPromise(bug._id))
                })
                Promise.all(bugDelRequests).then((allData) => {
                    console.log('All deleted bugs related to project ' + project.projectname)
                    console.log(allData)
                })
            })
            return project
        }).then((project) => {
            Forum.findOne({ forum_name: project.projectname }).then((forum) => {
                console.log(forum)
                deleteForum(forum._id)
            })
            return project
        }).then((project) => {
            let userProjectsInvolvedUpdateRequests = []
            project.testers_involved.forEach((tester) => {
                userProjectsInvolvedUpdateRequests.push(returnsTesterProjectsInvolvedUpdatePromise(tester, project.projectname))
            })
            userProjectsInvolvedUpdateRequests.push(returnsTesterProjectsInvolvedUpdatePromise(project.manager_email, project.projectname))
            Promise.all(userProjectsInvolvedUpdateRequests).then((allData) => {
                console.log('All Updated Testers Data ')
                console.log(allData)
            })
            res.json('Project Deleted Successfully')
        }).catch((err) => {
            res.status(400).json('Error in deleting the project: ' + err);
        })
}


function returnsProjectDeleteAPIPromise(projectName) {
    return new Promise((resolve, reject) => {
        Project.findOneAndDelete({ projectname: projectName })
            .then(async (project) => {
                await emptyAndDeleteFolderOfBucket(project)
                Bug.find({ projectname: project.projectname }).then((bugs) => {
                    let bugDelRequests = []
                    bugs.forEach((bug) => {
                        bugDelRequests.push(returnsBugDeleteAPIPromise(bug._id))
                    })
                    Promise.all(bugDelRequests).then((allData) => {
                        console.log('All deleted bugs related to project ' + project.projectname)
                        console.log(allData)
                    })
                })
                return project
            }).then((project) => {
                resolve(project)
            })
    })
}

function updateTesterProjectInvolvedArray(testerName,arrayOfProjects)
{
    return new Promise((resolve,reject)=>{
        User.findOne({username:testerName})
        .then(async(user)=>{
            let ptemp = user.project_involved
            console.log('---->arrayOfProjects---->'+arrayOfProjects)
            console.log('---->ptemp before---->'+ptemp)
            ptemp = ptemp.filter( function( el ) {
                return arrayOfProjects.indexOf( el ) < 0;
              });
            console.log('---->ptemp---->'+ptemp)
            console.log('---> user--->'+user)
            var myq = {username:user.username}
            var newv = { $set: {project_involved:ptemp}}
            User.updateOne(myq,newv,function(err,res){
                if(err)
                    reject(err)
            })
            // the user returned here is not updated one. But in DB user is updated.
            return user
        }).then((user)=>{
            User.findOne({username:user.username})
            .then((user)=>{
                resolve(user)
            })
        })
    })
}

deleteManager = (req, res) => {
    console.log('Inside Admin deleteManager')
    User.findByIdAndDelete(req.body._id)
        .then(async (user) => {
            let projectDelRequests = []
            user.project_involved.forEach((projectname) => {
                projectDelRequests.push(returnsProjectDeleteAPIPromise(projectname))
            })
            Promise.all(projectDelRequests).then((allData) => {
                console.log('All deleted projects related to Manager ' + user.email)
                console.log(allData)
                let non_unique_testers=[]
                allData.forEach((each)=>{
                    non_unique_testers.push(...each.testers_involved)
                })
                let unique_testers=[...new Set(non_unique_testers)]
                console.log('-------> unique_testers----->,'+unique_testers)
                let testerUpdatePromise=[]
                unique_testers.forEach((each_tester)=>{
                    testerUpdatePromise.push(updateTesterProjectInvolvedArray(each_tester,user.project_involved))
                })
                Promise.all(testerUpdatePromise).then((allData)=>{
                    let forum_deletion_requests=[]
                    user.project_involved.forEach((projectname)=>{
                        Forum.findOne({ forum_name: projectname }).then((forum) => {
                            console.log(forum)
                            forum_deletion_requests.push(deleteForum(forum._id))
                        })
                    })
                    Promise.all(forum_deletion_requests).then((allD)=>{

                    })
                    //console.log('Updated Testers Profile are')
                    //console.log(allData)
                })
            })
            res.json('Manager Deleted')
        }).catch((err) => {
            res.status(400).json('Error in finding the user: ' + err);
        })
}


function returnsProjectUpdateAfterTesterDeletionPromise(each, username) {
    return new Promise((resolve, reject) => {
        Project.findOne({ projectname: each })
            .then(async (project) => {
                let obj = {
                    project_key: each + '/' + username
                }
                await emptyAndDeleteFolderOfBucket(obj)
                let ptemp = project.testers_involved
                let pidx = ptemp.indexOf(username)
                ptemp.splice(pidx, 1)
                await project.save()
                return project
            }).then((project) => {
                resolve(project)
            })
    })
}

deleteTester = (req, res) => {
    console.log('Inside Admin deleteTester')
    User.findByIdAndDelete(req.body._id)
        .then((user) => {
            Bug.find({ username: user.username }).then((bugs) => {
                let bugDelRequests = []
                bugs.forEach((bug) => {
                    bugDelRequests.push(returnsBugDeleteAPIPromise(bug._id))
                })
                Promise.all(bugDelRequests).then((allData) => {
                    console.log('All deleted bugs related to User ' + user.username)
                    console.log(allData)
                })
            }).catch((err) => {
                console.log('Error in finding bugs of user: ' + user.username + ' with error: ' + err)
                res.status(400).json('Error in finding bugs of user: ' + user.username + ' with error: ' + err);
            })
            return user
        }).then((user) => {
            let projectUpdateRequests = []
            user.project_involved.forEach((project) => {
                projectUpdateRequests.push(returnsProjectUpdateAfterTesterDeletionPromise(project, user.username))
            })
            Promise.all(projectUpdateRequests).then((allData) => {
                console.log('All updated projects after deletion of tester ' + user.username)
                console.log(allData)
            })
            res.json('Tester Deleted successfully')
        }).catch((err) => {
            console.log('Error in finding the user ' + user.username + ' in users table with error: ' + err)
            res.status(400).json('Error in finding the user ' + user.username + ' in users table with error: ' + err);
        })
}

exports.deleteProject = deleteProject
exports.deleteManager = deleteManager
exports.deleteTester = deleteTester
exports.getAllUser = getAllUser