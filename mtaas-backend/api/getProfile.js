var user = require('../models/user');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

getProfile=(req, res, conn, bcrypt)=> {
    user.find({ email: req.body.email }, function(err, results) {
        console.log('get profile')
        if (err) 
          res.send(err)
        else
        {
            res.send(results[0])
        }
      });
}
exports.getProfile=getProfile;