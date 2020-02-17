var user = require('../models/user');
const Project=require('../models/project.model')

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

function returnsAPIPromise(each)
{
    return new Promise((resolve,reject)=>{
        Project.find({project_key:each}).
        then((response)=>{
            let obj=[]
            if(response[0]['pending_testers'].length!=0)
            {
              obj.push(each)
              obj.push(response[0]['pending_testers'])
            }
            
            // obj[each]=response[0]['pending_testers']
            resolve(obj)
        })
    })
}

let resArr=[]
let projects_involved
 getPendingList=(req, res, conn, bcrypt)=> {
    let allPending={}, pendingArr=[]
    user.find({ email: req.body.email }, function(err, results) {
        console.log('result of mongo query',results[0])
        projects_involved=results[0]['project_involved']
      })
      .then(async()=>{
        let projectFindRequests=[]
        projects_involved.forEach(element => {
          projectFindRequests.push(returnsAPIPromise(element))
        });
        Promise.all(projectFindRequests).then((allPending)=>{
          console.log('allpending--',allPending)
          res.send(allPending)
        })
      })

}
exports.getPendingList=getPendingList;