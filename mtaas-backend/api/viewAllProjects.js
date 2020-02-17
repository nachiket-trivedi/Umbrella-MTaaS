var user = require('../models/user');
const Project=require('../models/project.model')
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");
let testersObj={}

function returnsAPIPromise(each)
{
  testersObj={}
    return new Promise((resolve,reject)=>{
        Project.find({project_key:each}).
        then((response)=>{
          testersObj={'testers_involved':response[0]['testers_involved']}
            Object.assign(response[0]['project_details'],testersObj)
            resolve(response[0]['project_details'])
        })
    })
}


viewAllProjects=(req, res, conn, bcrypt)=> {
  let resArr=[]
    user.find({ email: req.body.email }, async function(err, results) {
        console.log('result of mongo query',results[0])
        if (err) 
          res.send(err)
        else
        {
          let projects_involved=results[0]['project_involved']
          let projectFindRequests=[]
          projects_involved.forEach(element => {
            projectFindRequests.push(returnsAPIPromise(element))
          });
          Promise.all(projectFindRequests).then((all_data)=>{
            console.log('resArr-',all_data)
            res.send(all_data)
          })
        }
      });
}
exports.viewAllProjects=viewAllProjects;