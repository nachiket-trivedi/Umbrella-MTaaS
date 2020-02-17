var user = require('../models/user');
var Project=require('../models/project.model')

var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

getAllProjectsForTester=(req, res, conn, bcrypt)=> {

Project.find({},function(err,results){
  console.log('results',results)
  res.send(results)
})
    // user.find({role:"Manager"}, function(err, results) {
    //     console.log('result of mongo query',results)
    //     if (err) 
    //       res.send(err)
    //     else
    //     {
    //         let allProjArr=[]
    //         for(let item of results)
    //         {
    //             let name=item['name'];
    //             let projects=item['projects'];
    //             let arr=[name, projects]
    //             allProjArr.push(arr)
    //         }
    //         res.send(allProjArr);
    //     }
    //   });


}
exports.getAllProjectsForTester=getAllProjectsForTester;