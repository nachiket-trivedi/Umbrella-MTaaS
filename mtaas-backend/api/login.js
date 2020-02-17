var user = require('../models/user');
var jwt = require('jsonwebtoken');
const GlobalVar = require("../GlobalVar");


login = (req, res, bcrypt) => {
    let email = req.body.username;
    let username = req.body.username;
    let password = req.body.password;
    let roleObject = req.body.role;
    let role = roleObject.value;
    console.log("about to login", JSON.stringify(req.body));
    console.log(username);
    console.log(role);

    user.findOne({ "email": username, "role": role }, function (err, results) {
        console.log(results);
        if (err) throw err;
        else if (results != null) {
            // let tester_data = results;
            console.log('res', results);
            let passwordInDb = results.password;
            let nameInDb = results.name;
            
            console.log(password);
            bcrypt.compare(password, passwordInDb, function (err, resp) {
                if (resp) {
                    console.log(role, "logged in succesfully, now cookie time");
                    let cookieObj = { cookie: role, email: email, name: nameInDb, username: username }
                    res.send(JSON.stringify(cookieObj));
                } else {
                    res.send("error");
                }
            });
        } else {
            res.send("error");
        }
    });
}

exports.login = login;