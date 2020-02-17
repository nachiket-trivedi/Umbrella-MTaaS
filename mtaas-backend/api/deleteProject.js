// var user = require('../models/user');
// var jwt = require('jsonwebtoken');
// const GlobalVar = require("../GlobalVar");

// deleteProject=(req, res, conn, bcrypt)=> {
//     let projDataObj=req.body
//     console.log('axios req',projDataObj)

//     user.find({ email: req.body.email }, function(err, results) {
//         console.log('result of mongo query',results[0])
//         if (err) 
//           res.send(err)
//         else
//         {
//             let projArr=results[0]['projects'];
//             let projId=req.body.proj_id;
//             for(let item of projArr)
//             {
//                 if(item['proj_id']==projId)
//                 {
//                     let index=projArr.indexOf(item)
//                     projArr.splice(index,1);
//                 }
//             }
//             results[0].save()
//             res.send(JSON.stringify(results[0]));
//         }
//       });

// }
// exports.deleteProject=deleteProject;