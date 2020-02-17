const User=require('../models/user')
const Project=require('../models/project.model')
const GlobalVar = require("../GlobalVar");

getOneUser = (req,res)=>{
    console.log('Inside getOneUser')
    User.findOne({username:req.body.username})
    .then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.status(400).json('Error in getOneUser: '+err)
    })
}

getTesterZipCodes = (req,res)=>{
    console.log('Inside getTesterZipCodes')
    Project.findOne({projectname:req.body.projectname})
    .then(async(project)=>{
        console.log(project)
        let result_zips=[]
        for(var each of project.testers_involved)
        {
            await User.findOne({username:each}).then((user)=>{
                let obj={
                    "username":user.username,
                    "zipcode":user.zipcode,
                    "name":user.name
                }
                result_zips.push(obj)
            }).catch((err)=>{
                res.status(400).json('Error in finding user '+each+' of project '+req.params.projectName)
            })
        }
        res.json(result_zips)
    }).catch((err)=>{
        res.status(400).json('Error in finding project '+req.params.projectName+' .Errorred with error: '+err)
    })
}




exports.getOneUser = getOneUser
exports.getTesterZipCodes = getTesterZipCodes