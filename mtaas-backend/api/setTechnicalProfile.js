var user = require('../models/user');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

setTechnicalProfile=(req, res, conn, bcrypt)=> {
    let git_url = req.body.git_url;
    let linkedin_url = req.body.linkedin_url;
    let experience = req.body.experience;
    let tech = req.body.tech;
    
    user.find({ email: req.body.email }, function(err, results) {
        console.log('update technical profile')
        if (err) 
          res.send(err)
        else
        {
            if(git_url!=undefined)
                results[0]['git_url']=git_url;
            if(linkedin_url!=undefined)
                results[0]['linkedin_url']=linkedin_url;
            if(experience!=undefined)
                results[0]['experience']=experience;
            if(tech!=undefined)
                results[0]['tech']=tech;   
            results[0].save()
            res.send(JSON.stringify(results))
        }
      });
}
exports.setTechnicalProfile=setTechnicalProfile;