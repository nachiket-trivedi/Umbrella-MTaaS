import React from 'react';
import { Tooltip } from 'reactstrap';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Navbar from "../Navbar/Navbar";
import './EditBug.css'

const GlobalVar = require("../../GlobalVar");
class EditBug extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            projectname:'',
            severity:'',
            hardware:'',
            version:'',
            summary:'',
            date:new Date(),
            selectedFile:null,
            base:GlobalVar.server_base_url,
            projects:[],
            severity_arr:[],
            os_arr:[],
            tooltipOpen:false
        }

       this.onChangeProjectName=this.onChangeProjectName.bind(this);
       this.onChangeSeverity=this.onChangeSeverity.bind(this);
       this.onChangeHardware=this.onChangeHardware.bind(this);
       this.onChangeVersion=this.onChangeVersion.bind(this);
       this.onChangeSummary=this.onChangeSummary.bind(this);
       this.onChangeDate=this.onChangeDate.bind(this);
       this.onChangeFileUpload=this.onChangeFileUpload.bind(this);
       this.onSubmit=this.onSubmit.bind(this);
       this.onToggle=this.onToggle.bind(this);
    }

    componentDidMount(){
        let data={id:this.props.match.params.id}
        axios.post(this.state.base+'bugs/singleBug',data).then((response)=>{
            this.setState({
                username:response.data.username,
                projectname:response.data.projectname,
                severity:response.data.severity,
                hardware:response.data.hardware,
                version:response.data.version,
                summary:response.data.summary,
                date:new Date(response.data.date)
            })
        }).catch(err=>console.log("Error in getting data for the record: "+err));

        this.setState({
            file_was_not_present:this.state.selectedFile==null?true:false,
            severity_arr:['Low','Medium','High'],
            os_arr:['Android','iOS','Series 40','BlackBerry','Windows','Bada','Symbian','MeeGo']
        })

        let dd={username:localStorage.getItem('email')}
        //Need an api that returns me the entire user object found in database
        axios.post(this.state.base+'users/oneUser',dd).then((response)=>{
            //response.data returns an array of objects containing our documents in the database
                //to show only the projects the tester is added in
                if(response.data.project_involved.length > 0)
                {
                    this.setState({
                        projects:response.data.project_involved
                    })
                }
        }).catch((err)=>{
            console.log("Unable to fetch user details: "+err);
        }) 
    }

   onChangeProjectName(e)
   {
       this.setState({
           projectname:e.target.value
       });
   }

   onChangeSeverity(e)
   {
       this.setState({
           severity:e.target.value
       });
   }

   onChangeHardware(e)
   {
       this.setState({
           hardware:e.target.value
       });
   }

   onChangeVersion(e)
   {
       this.setState({
           version:e.target.value
       });
   }

   onChangeSummary(e)
   {
       this.setState({
           summary:e.target.value
       });
   }

   onChangeDate(date)
   {
       this.setState({
           date:date
       });
   }

   onChangeFileUpload(e)
    {
        console.log(e.target.files[0])
        this.setState({
            selectedFile:e.target.files[0]
        });
        console.log(this.state.selectedFile)
    }

    onToggle(e)
    {
        this.setState({
            tooltipOpen:!this.state.tooltipOpen
        });
    }

    onSubmit(e){
        
        e.preventDefault();

        let fd=new FormData();
        fd.append('id',this.props.match.params.id)
        fd.append('username',this.state.username)
        fd.append('projectname',this.state.projectname)
        fd.append('severity',this.state.severity);
        fd.append('hardware',this.state.hardware);
        fd.append('version',this.state.version);
        fd.append('summary',this.state.summary);
        fd.append('date',this.state.date);
        fd.append('file',this.state.selectedFile);
        const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        
        axios.post(this.state.base+'bugs/update',fd,config).then((res)=>{
            console.log(res.data);
            alert('Bug has been updated successfully')
            window.location='/bugList'
        }).catch(error => {console.log("Error aa gayi")})
    }

    render(){
        return(
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="bugDiv">
                    <h3>Edit Bug</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Projectname: </label>
                            <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.projectname}
                            onChange={this.onChangeProjectName}>
                            {   //opening of curly braces so as to enter js code and distinguish from JSX html code
                                this.state.projects.map((project)=>{
                                    //<option>value_to_be_displayed</option>
                                    return <option key={project} value={project}>{project}</option>
                                })
                                //closing of curly braces meaning our js code has finished
                            }   
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Severity Level: </label>
                            <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.severity}
                            onChange={this.onChangeSeverity}>
                            {   //opening of curly braces so as to enter js code and distinguish from JSX html code
                                this.state.severity_arr.map((severe)=>{
                                    //<option>value_to_be_displayed</option>
                                    return <option key={severe} value={severe}>{severe}</option>
                                })
                                //closing of curly braces meaning our js code has finished
                            }   
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Mobile Operating System: </label>
                            <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.hardware}
                            onChange={this.onChangeHardware}>
                            {   //opening of curly braces so as to enter js code and distinguish from JSX html code
                                this.state.os_arr.map((os)=>{
                                    //<option>value_to_be_displayed</option>
                                    return <option key={os} value={os}>{os}</option>
                                })
                                //closing of curly braces meaning our js code has finished
                            }   
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Version (Mobile OS Version): </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.version}
                                onChange={this.onChangeVersion}></input>
                        </div>

                        <div className="form-group">
                            <label>Summary: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.summary}
                                onChange={this.onChangeSummary}></input>
                        </div>
                        
                        <div className="form-group">
                            <label>Date: </label>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}/>
                        </div>
                        <div className="form-group files">
                            <label> Upload Your File
                                <span style={{color:"blue"}} href="#" id="TooltipExample"> (info)</span>
                                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                                        Leave empty to keep previously uploaded file (if any) or upload new file to replace old file
                                    </Tooltip>
                            </label>
                            <input type="file" 
                                    className="form-control" 
                                    multiple=""
                                    onChange={this.onChangeFileUpload}></input>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Update Bug" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>            
        )
    }
}

export default EditBug