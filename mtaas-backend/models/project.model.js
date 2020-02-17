const mongoose=require('mongoose');

const Schema=mongoose.Schema;''

const projectSchema=new Schema({
    projectname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    project_url:{type:String,default:null},
    project_key:{type:String,default:null},
    testers_involved:[String],
    testers_rejected:[String],
    manager_email:{type:String},
    pending_testers:[String],
    project_details:{ type: Object }
},{
    timestamps:true
});

const Project=mongoose.model('project',projectSchema)

module.exports=Project;