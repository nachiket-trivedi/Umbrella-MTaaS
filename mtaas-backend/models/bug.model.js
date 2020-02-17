const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bugSchema=new Schema({
    username:{type:String,required:true},
    projectname:{type:String,required:true},
    severity:{type:String,required:true},
    hardware:{type:String,required:true},
    version:{type:String,required:true},
    summary:{type:String,required:true},
    file_url:{type:String,default:null},
    file_key:{type:String,default:null},
    date:{type:Date,required:true}
},{
    timestamps:true
});

const BugReport=mongoose.model('bug',bugSchema)

module.exports=BugReport;