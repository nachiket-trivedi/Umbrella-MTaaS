// var Tester = require('../models/Tester');
// var Manager = require('../models/Manager');
var user = require('../models/user');
const GlobalVar = require("../GlobalVar");
var jwt = require('jsonwebtoken');

signup = (req, res, bcrypt, saltRounds) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let roleObject = req.body.role;
    let role = roleObject.value;
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let name = req.body.name;
    //---------------w/ mongobd
    let tester_id = "";
    var tester = user({
        name: name,
        email: email,
        phone: phone,
        zipcode: zipcode,
        username: username,
        role: role
    });
    user.find({}, function (err, results) {
        if (err) throw err;
        let tester_data = results;
        let flag = 0;
        tester_data.forEach(element => {
            if (username == element.username) {
                flag = 1;
            }
            tester_id = element._id;
        });
        if (flag == 1) {
            console.log(role, " id exists");
            res.send("exists");
        } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                tester.password = hash;
                tester.save(function (err) {
                    if (err) throw err;
                    let token = jwt.sign({ email: email }, GlobalVar['secret']);
                    token = "Bearer " + token;
                    console.log('token is----', token);
                    res.setHeader("Access-Control-Expose-Headers", "Authorization");
                    res.header({ "Authorization": token })
                    let cookieObj = { cookie: role, email: email, name: name, username: username }
                    res.send(cookieObj);
                    res.end("Successful Account Creation");
                });
                // object of all the users
                console.log(role, results);

            });
        }
    });
}

exports.signup = signup;