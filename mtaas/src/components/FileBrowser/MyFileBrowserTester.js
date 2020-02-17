import Navbar from "../Navbar/Navbar";
import './MyFileBrowserTester.css'
import '../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'
import FileBrowser from 'react-keyed-file-browser'
import React from 'react';
import Moment from 'moment'
import axios from 'axios'
import { Tooltip } from 'reactstrap';
const GlobalVar = require("../../GlobalVar");

class MyFileBrowserTester extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            base:GlobalVar.server_base_url,
            base_url:GlobalVar.AWS_BASE_URL,
            files:[],
            username:'',
            projects:[],
            projectname:'',
            selectedFile:null,
            tooltipOpen:false,
        }
        this.onChangeProjectName=this.onChangeProjectName.bind(this);
        this.onChangeFileUpload=this.onChangeFileUpload.bind(this)
        this.onSubmitTester=this.onSubmitTester.bind(this);
        this.onSubmitTesterFile=this.onSubmitTesterFile.bind(this)
        this.onDeleteFileHandler=this.onDeleteFileHandler.bind(this)
        this.onToggle=this.onToggle.bind(this);
    }

    componentDidMount(){
        this.setState({
            username:localStorage.getItem('email')
        })
        let data={username:localStorage.getItem('email')}
        axios.post(this.state.base+'users/oneUser',data).then((response)=>{
            if(response.data.project_involved.length > 0)
            {
                let temp=response.data.project_involved
                //temp.push('ALL')
                this.setState({
                    projects:temp,
                    projectname:response.data.project_involved[0]
                })
            }
        }).catch((err)=>{
            console.log("Unable to get list of users: "+err);
        })
    }

    onChangeProjectName(e)
    {
        this.setState({
            projectname:e.target.value
        });
    }

    onChangeFileUpload(e)
    {
        console.log(e.target.files[0])
        this.setState({
            selectedFile:e.target.files[0]
        });
    }

    onToggle(e)
    {
        this.setState({
            tooltipOpen:!this.state.tooltipOpen
        });
    }

    onDeleteFileHandler(e)
    {
        axios.delete(this.state.base+'fileBrowser/deleteFile',{data:{file_key:e}}).then((response)=>{
            alert('File Deleted Successfully')

            if(this.state.projectname==='ALL')
            {
                let data={
                    username:this.state.username
                }
                axios.post(this.state.base+'fileBrowser/testerAllProjectFiles',data).then((response)=>{
                    console.log(response.data)
                    this.setState({
                        files:response.data.map((each)=>{
                            return{
                                key:each.key,
                                url:this.state.base_url+each.key,
                                modified:Moment(each.modified),
                                size:each.size
                            }
                        })
                    })
                }).catch(err=>console.log("Error in fetching files for the project for the user: "+err));
            }
            else
            {
                let data={
                    username:this.state.username,
                    projectname:this.state.projectname
                }
                axios.post(this.state.base+'fileBrowser/testerOneProjectFiles',data).then((response)=>{
                    console.log(response.data)
                    this.setState({
                        files:response.data.map((each)=>{
                            return{
                                key:each.key,
                                url:this.state.base_url+each.key,
                                modified:Moment(each.modified),
                                size:each.size
                            }
                        })
                    })
                }).catch(err=>console.log("Error in fetching files for the project for the user: "+err));
            }
        }).catch((err)=>{
            alert('Error in deleting the file '+err)})
    }

    onSubmitTester(e)
    {
        e.preventDefault();
        if(this.state.projectname === 'ALL')
        {
            let data={
                username:this.state.username
            }
            axios.post(this.state.base+'fileBrowser/testerAllProjectFiles',data).then((response)=>{
                    console.log(response.data)
                    this.setState({
                        files:response.data.map((each)=>{
                            return{
                                key:each.key,
                                url:this.state.base_url+each.key,
                                modified:Moment(each.modified),
                                size:each.size
                            }
                        })
                    })
                }).catch(err=>console.log("Error: "+err));
        }
        else{
            let data={
                username:this.state.username,
                projectname:this.state.projectname
            }
            axios.post(this.state.base+'fileBrowser/testerOneProjectFiles',data).then((response)=>{
                console.log(response.data)
                this.setState({
                    files:response.data.map((each)=>{
                        return{
                            key:each.key,
                            url:this.state.base_url+each.key,
                            modified:Moment(each.modified),
                            size:each.size
                        }
                    })
                })
            }).catch(err=>console.log("Error: "+err));
        }
    }

    /*
        Uploads files to Tester folder in Project's folder in s3
    */
    onSubmitTesterFile(e)
    {
        e.preventDefault()
        if(this.state.projectname==='ALL')
        {
            alert('Cannot upload to multiple projects at same time. Please select only one project')
        }
        else{
            let fd=new FormData()
            fd.append('username',this.state.username);
            fd.append('projectname',this.state.projectname);
            fd.append('file',this.state.selectedFile);
            const config = { headers: { 'Content-Type': 'multipart/form-data'} };
            axios.post(this.state.base+'fileBrowser/testerUploadFile',fd,config).then((res)=>{
                console.log(res.data);
                alert('File Uploaded to user folder successfully')
                let data={
                    username:this.state.username,
                    projectname:this.state.projectname
                }
                axios.post(this.state.base+'fileBrowser/testerOneProjectFiles',data).then((response)=>{
                    console.log(response.data)
                    this.setState({
                        files:response.data.map((each)=>{
                            return{
                                key:each.key,
                                url:this.state.base_url+each.key,
                                modified:Moment(each.modified),
                                size:each.size
                            }
                        })
                    })
                }).catch(err=>console.log("Error: "+err));
            }).catch(error => {console.log("Error in creating new bug report: "+error)})
        }
    }
    
    render(){
        return (
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="formDiv">
                    <h4>List Tester Files</h4>
                    <form onSubmit={this.onSubmitTester}>
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
                            <div className="form-group files">
                                <label>Upload Your File 
                                    <span style={{color:"blue"}} href="#" id="TooltipExample"> (info)</span>
                                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                                        Tester upload goes to tester's folder inside Project in S3
                                    </Tooltip>
                                </label>
                                <input type="file" 
                                        className="form-control" 
                                        multiple=""
                                        onChange={this.onChangeFileUpload}>
                                </input>
                            </div>
                        <button type="submit"
                                className="btn btn-primary">
                            Get Tester Files
                        </button>
                        {' '}
                        <button type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmitTesterFile}>
                                Upload Tester File
                        </button>
                    </form>
                </div>
                <br/>
                <div className="fileBrowserDiv">
                    <FileBrowser
                    files={this.state.files}
                    icons={{
                        Text: <i className="fa fa-file-text" aria-hidden="true" />,
                        File: <i className="fa fa-file" aria-hidden="true" />,
                        Image: <i className="fa fa-file-image" aria-hidden="true" />,
                        Video: <i className="fa fa-file-video" aria-hidden="true" />,
                        Audio: <i className="fa fa-file-audio" aria-hidden="true" />,
                        Archive: <i className="fa fa-file-archive" aria-hidden="true" />,
                        Word: <i className="fa fa-file-word" aria-hidden="true" />,
                        Excel: <i className="fa fa-file-excel" aria-hidden="true" />,
                        PowerPoint: <i className="fa fa-file-powerpoint" aria-hidden="true" />,
                        Text: <i className="fa fa-file-text" aria-hidden="true" />,
                        PDF: <i className="fa fa-file-pdf" aria-hidden="true" />,
                        Rename: <i className="fa fa-i-cursor" aria-hidden="true" />,
                        Folder: <i className="fa fa-folder" aria-hidden="true" />,
                        FolderOpen: <i className="fa fa-folder-open" aria-hidden="true" />,
                        Delete: <i className="fa fa-trash" aria-hidden="true" />,
                        Loading: <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />,
                        Download: <i className="fa fa-download" aria-hidden="true" />
                    }}
                    onDeleteFile={this.onDeleteFileHandler}
                    onDownloadFile={(fileKey) => {window.location=this.state.base_url+fileKey}}
                    />
                </div>
            </div>
        )
    }
}

export default MyFileBrowserTester