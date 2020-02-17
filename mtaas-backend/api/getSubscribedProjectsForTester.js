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


getSubscribedProjectsForTester=(req, res, conn, bcrypt)=> {

user.find({email:req.body.email},async function(err,results){
    let project_involved=results[0]['project_involved']
    let resArr=[]
    console.log('project_involved',project_involved)
    let projectFindRequests=[]

    project_involved.forEach(element => {
        projectFindRequests.push(returnsAPIPromise(element))
    });
        
    Promise.all(projectFindRequests).then((all_data)=>{
        console.log('resArr-',all_data)
        res.send(all_data)
    })
})
}
exports.getSubscribedProjectsForTester=getSubscribedProjectsForTester;