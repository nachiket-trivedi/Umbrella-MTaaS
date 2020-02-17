var user = require('../models/user');
var Project=require('../models/project.model')

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

function returnsAPIPromise(each)
{
    return new Promise((resolve,reject)=>{
        Project.find({project_key:each}).
        then((response)=>{
            resolve(response[0])
        })
    })
}


getRejectedProjectsForTester=(req, res, conn, bcrypt)=> {

user.find({email:req.body.email},async function(err,results){
    let rejected_projects=results[0]['rejected_projects']
    let resArr=[]
    console.log('rejected_projects',rejected_projects)
    let projectFindRequests=[]

    rejected_projects.forEach(element => {
        projectFindRequests.push(returnsAPIPromise(element))
    });
        
    Promise.all(projectFindRequests).then((all_data)=>{
        console.log('resArr-',all_data)
        res.send(all_data)
    })
})
}
exports.getRejectedProjectsForTester=getRejectedProjectsForTester;