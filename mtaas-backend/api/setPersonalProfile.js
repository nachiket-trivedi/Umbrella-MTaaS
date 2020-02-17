var user = require('../models/user');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");

setPersonalProfile=(req, res, conn, bcrypt)=> {
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let bdate = req.body.bdate;
    let about = req.body.about;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    console.log('req.body-',req.body.phone)
    user.find({ email: req.body.email },function(err, results) {
        console.log('update personal profile', results)
        if (err) 
          res.send(err)
        else
        {
            if(phone!=undefined)
                results[0]['phone']=phone;
            if(zipcode!=undefined)
                results[0]['zipcode']=zipcode;
            if(bdate!=undefined)
                results[0]['bdate']=bdate;
            if(about!=undefined)
                results[0]['about']=about;
            if(address!=undefined)
                results[0]['address']=address;  
            if(city!=undefined)
                results[0]['city']=city;
            if(state!=undefined)
                results[0]['state']=state;   
            results[0].save()
            res.send(JSON.stringify(results))
        }
      });
}
exports.setPersonalProfile=setPersonalProfile;