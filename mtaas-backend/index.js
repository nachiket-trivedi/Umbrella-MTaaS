//package imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
// var corsPrefetch = require("cors-prefetch-middleware");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
// var kafka = require('./kafka/client');

//api declarations
var Database=require('../mtaas-backend/Database');
var SetTechnicalProfile=require('./api/setTechnicalProfile');
var SetPersonalProfile=require('./api/setPersonalProfile');
var Signup=require('./api/signup');
var Login=require('./api/login');
var AddProject=require('./api/addProject');
var ViewAllProjects=require('./api/viewAllProjects');
var DeleteProject=require('./api/deleteProject.js');
var GetAllProjectsForTester=require('./api/getAllProjectsForTester.js');
var ApplyForProject=require('./api/applyForProject.js');
var GetPendingList=require('./api/getPendingList.js');
var ApproveTester=require('./api/approveTester.js');
var RejectTester=require('./api/rejectTester.js');
var GetSubscribedProjectsForTester=require('./api/getSubscribedProjectsForTester.js');
var GetRejectedProjectsForTester=require('./api/getRejectedProjectsForTester.js');
var GetProfile=require('./api/getProfile.js');
var GetProjects=require('./api/getProjects');
var announcement=require('./api/announcementRoute')
//Sarthak api declarations
var Bugs=require('./api/bugs');
var UsersAPI=require('./api/usersAPI');
var FileBrowser=require('./api/fileBrowser')
var Admin=require('./api/adminFunction')
var AdminReports = require('./api/adminReports')
var ManagerReports = require('./api/managerReports')
var TesterReports = require('./api/testerReports')

// Sarthak Part Start here
require('dotenv').config();
const AWS=require('aws-sdk');
const multerS3 = require('multer-s3')
const multer = require('multer')
// Sarthak part end here


//few constants declarations
const GlobalVar = require("../mtaas-backend/GlobalVar");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//mongodb model declaration for passport jwt
var user = require('../mtaas-backend/models/user');

//express delcarations
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/images"));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({origin: GlobalVar['hostedAddress'] + ":3000", credentials:true})); //self note-use cors to allow cross origin resource sharing
app.use(
  session({
    secret: "cmpe281_mtaas",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);//self note-we use express session to maintain session data
app.use(bodyParser.json());

// The passport JWT strategy
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = GlobalVar['secret'];
var testerStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  user.find({email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
var managerStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  user.find({email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
passport.use('testerAuth',testerStrategy);
passport.use('managerAuth',managerStrategy);


//all the api endpoint calls
app.post("/login", function(req, res) {
  Login.login(req,res,bcrypt)
});

app.post("/signup", function(req, res) {
  Signup.signup(req,res,bcrypt,saltRounds)
});

app.post("/setPersonalProfile",  function(req, res) {
  SetPersonalProfile.setPersonalProfile(req,res)
});

app.post("/setTechnicalProfile", function(req, res) {
  SetTechnicalProfile.setTechnicalProfile(req,res)
});

app.post("/approveTester", function(req, res) {
  ApproveTester.approveTester(req,res)
});

app.post("/getSubscribedProjectsForTester", function(req, res) {
  GetSubscribedProjectsForTester.getSubscribedProjectsForTester(req,res)
});

app.post("/getRejectedProjectsForTester", function(req, res) {
  GetRejectedProjectsForTester.getRejectedProjectsForTester(req,res)
});

app.post("/getProfile", function(req, res) {
  GetProfile.getProfile(req,res)
});

app.use('/',GetProjects);
app.use('/',announcement);
app.post("/rejectTester", function(req, res) {
  RejectTester.rejectTester(req,res)
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: GlobalVar['AWS_ACCESS_KEY_ID'],
  secretAccessKey: GlobalVar['AWS_SECRET_ACCESS_KEY'],
  region: GlobalVar['AWS_REGION']
});

const commonFileUpload = multer({
storage: multerS3({
  s3: s3,
  bucket: GlobalVar['AWS_BUCKET_NAME'],//'mtaas-course-project-nachiket',
  key: function (req, file, cb) {
      cb(null, req.body.name+'/'+'Common/'+file.originalname)
  }
})
})

app.post("/addProject",commonFileUpload.single('file'), function(req, res) {
  AddProject.addProject(req,res)
});

app.post("/viewAllProjects", function(req, res) {
  ViewAllProjects.viewAllProjects(req,res)
});

app.post("/deleteProject", function(req, res) {
  DeleteProject.deleteProject(req,res)
});

app.post("/getAllProjectsForTester", function(req, res) {
  GetAllProjectsForTester.getAllProjectsForTester(req,res)
});

app.post("/applyForProject", function(req, res) {
  ApplyForProject.applyForProject(req,res)
});

app.post("/bugs", function(req,res){
  Bugs.getAllBugs(req,res)
});

app.post("/bugs/oneProject", function(req,res){
  Bugs.getOneProjectBugs(req,res)
});

app.post('/bugs/oneProjectManager',function(req,res){
  Bugs.getOneProjectBugsManager(req,res)
});

app.post("/bugs/allProject",function(req,res){
  Bugs.getAllProjectBugs(req,res)
});

const bugScriptUpload = multer({
  storage: multerS3({
      s3: s3,
      bucket: GlobalVar.AWS_BUCKET_NAME,
      key: function (req, file, cb) {
          cb(null, req.body.projectname+'/'+req.body.username+'/'+file.originalname)
      }
  })
})

app.post("/bugs/add",bugScriptUpload.single('file'),function(req,res){
  Bugs.createBug(req,res)
});

app.post("/bugs/singleBug",function(req,res){
  Bugs.getSingleBug(req,res)
});

app.post("/bugs/delete",function(req,res){
  Bugs.deleteSingleBug(req,res)
});

app.post("/bugs/deleteBugFile",function(req,res){
  Bugs.deleteSingleBugFile(req,res)
});

app.post("/bugs/update",bugScriptUpload.single('file'),function(req,res){
  Bugs.updateBug(req,res)
});

app.post("/users/oneUser",function(req,res){
  UsersAPI.getOneUser(req,res)
})

app.post('/users/getZipCodes',function(req,res){
  UsersAPI.getTesterZipCodes(req,res)
})

app.post('/fileBrowser/adminGet',function(req,res){
  FileBrowser.adminGET(req,res)
});

app.post('/fileBrowser/testerOneProjectFiles',function(req,res){
  FileBrowser.testerOneProjectFiles(req,res)
});

app.post('/fileBrowser/testerAllProjectFiles',function(req,res){
  FileBrowser.testerAllProjectFiles(req,res)
});

app.delete('/fileBrowser/deleteFile',function(req,res){
  FileBrowser.deleteFile(req,res)
});

app.post('/fileBrowser/managerOneProjectFiles',function(req,res){
  FileBrowser.managerOneProjectFiles(req,res)
});

const testerUploadFile = multer({
  storage: multerS3({
      s3: s3,
      bucket: GlobalVar.AWS_BUCKET_NAME,
      key: function (req, file, cb) {
          cb(null, req.body.projectname+'/'+req.body.username+'/'+file.originalname)
      }
  })
})

app.post('/fileBrowser/testerUploadFile',testerUploadFile.single('file'),(req,res)=>{
  console.log("File uploaded to the user's space in s3")
  res.json('File added')
})

const managerUploadFile = multer({
  storage: multerS3({
      s3: s3,
      bucket: GlobalVar.AWS_BUCKET_NAME,
      key: function (req, file, cb) {
          cb(null, req.body.projectname+'/'+'Common/'+file.originalname)
      }
  })
})

app.post('/fileBrowser/managerUploadFile',managerUploadFile.single('file'),(req,res)=>{
  console.log("File uploaded to the common folder in s3")
  res.json('File added')
})

app.post("/getPendingList", function(req, res) {
  GetPendingList.getPendingList(req,res)
});

// expects Project ID given by mongoDB to the project created, in req.body.id field
app.post('/admin/deleteProject',(req,res)=>{
  Admin.deleteProject(req,res)
})

// expects Manager ID given by mongoDB to the Manager created, in req.body.id field
app.post('/admin/deleteManager',(req,res)=>{
  Admin.deleteManager(req,res)
})

// expects Tester ID given by mongoDB to the Tester created, in req.body.id field
app.post('/admin/deleteTester',(req,res)=>{
  Admin.deleteTester(req,res)
})

app.get('/admin/getAllUser',(req,res)=>{
  Admin.getAllUser(req,res)
})

app.get('/admin/reports/testersPerProject',(req,res)=>{
  AdminReports.getNumberOfWorkingTesterPerProject(req,res)
})

app.get('/admin/reports/numberTesterManager',(req,res)=>{
  AdminReports.getNumberOfTesterManager(req,res)
})

app.get('/admin/reports/projectDivisionBasedCount',(req,res)=>{
  AdminReports.getProjectTesterRuleBasedCount(req,res)
})

app.get('/admin/reports/filesInS3PerProject',(req,res)=>{
  AdminReports.getCountS3FilesPerProject(req,res)
})

app.post('/manager/reports/testersPerProject',(req,res)=>{
  ManagerReports.getNumberOfTestersForEachProject(req,res)
})

app.post('/manager/reports/bugsPerProject',(req,res)=>{
  ManagerReports.getNumberOfBugsForEachProject(req,res)
})

app.post('/manager/reports/filesInS3PerProject',(req,res)=>{
  ManagerReports.getNumberOfFilesInS3ForEachProject(req,res)
})

app.post('/manager/reports/filesSizeInS3PerProject',(req,res)=>{
  ManagerReports.getSizeOfFilesInS3ForEachProject(req,res)
})

app.post('/tester/reports/bugsPerProject',(req,res)=>{
  TesterReports.getNumberOfBugsForEachProject(req,res)
})

app.post('/tester/reports/filesInS3PerProject',(req,res)=>{
  TesterReports.getNumberOfFilesInS3ForEachProject(req,res)
})

app.listen(3001);
console.log("Server Listening on port 3001");
