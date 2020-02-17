import React from 'react';
import axios from 'axios';
import Bug from './Bug'
import Navbar from "../Navbar/Navbar";
import './BugTracker.css'

const GlobalVar = require("../../GlobalVar");

class BugTracker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            base:GlobalVar.server_base_url,
            bugs:[],
            username:'',
            projects:[],
            projectname:'',
            username:''
        }
        this.deleteBug=this.deleteBug.bind(this);
        this.deleteBugFile=this.deleteBugFile.bind(this);
        this.onChangeProjectName=this.onChangeProjectName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({
            username:localStorage.getItem('email')
        })
        let data={username:localStorage.getItem('email')}

        if(localStorage.getItem('cookie')==='Admin')
        {
            axios.post(this.state.base+'getAllProjectsForTester',data).then((response)=>{
                if(response.data.length > 0)
                {
                    let projectName=[]
                    response.data.forEach((eachProject)=>{
                        projectName.push(eachProject.projectname)
                    })
                    this.setState({
                        projects:projectName,
                        projectname:projectName[0]
                    })
                }
            }).catch((err)=>{
                console.log("Unable to fetch user details: "+err);
            })
        }
        else
        {
            axios.post(this.state.base+'users/oneUser',data).then((response)=>{
                //response.data returns an array of objects containing our documents in the database
                //to show only the projects the tester is added in
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
                console.log("Unable to fetch user details: "+err);
            })
        }
    }

    onChangeProjectName(e)
    {
        console.log('Project selected: '+e.target.value)
        this.setState({
            projectname:e.target.value
        });
    }

    deleteBug(bid)
    {
        console.log('Inside deleteBug')
        let data={id:bid}
        console.log(data)
        axios.post(this.state.base+'bugs/delete',data).then((response)=>{
            console.log(response.data);
        }).catch(err=>console.log("Error: "+err));
        this.setState({
            bugs:this.state.bugs.filter((each)=>{
                return each._id!==bid;
            })
        })
    }

    deleteBugFile(bug)
    {
        console.log('in deleteBugFile function')
        const updatedBug = {
            id:bug._id,
            username:bug.username,
            projectname:bug.projectname
        }
        console.log(updatedBug)
       
        axios.post(this.state.base+'bugs/deleteBugFile/',updatedBug).then((response)=>{
            console.log(response.data);
            if(this.state.projectname === 'ALL')
            {
                let data={username:this.state.username}
                axios.post(this.state.base+'bugs/allProject',data).then((response)=>{
                    this.setState({
                        bugs:response.data
                    })
                }).catch(err=>console.log("Error: "+err));
            }
            else{
                let data={username:this.state.username,projectname:this.state.projectname}
                axios.post(this.state.base+'bugs/oneProject',data).then((response)=>{
                    this.setState({
                        bugs:response.data
                    })
                }).catch(err=>console.log("Error: "+err));
            }
            }).catch(err=>console.log("Error: "+err));
    }

    bugList(){
        return this.state.bugs.map((eachBug)=>{
            //for each object in exercise we are returning an Exercise component and passing three props
            return <Bug bug={eachBug} deleteBug={this.deleteBug} key={eachBug._id} deleteBugFile={this.deleteBugFile}/>
        })
    }

    onSubmit(e)
    {
        e.preventDefault();
        if(this.state.projectname === 'ALL')
        {
            let data={username:this.state.username}
            axios.post(this.state.base+'bugs/allProject',data).then((response)=>{
                this.setState({
                    bugs:response.data
                })
            }).catch(err=>console.log("Error: "+err));
        }
        else{
            if(localStorage.getItem('cookie')==='Tester')
            {
                let data={username:this.state.username,projectname:this.state.projectname}
                axios.post(this.state.base+'bugs/oneProject',data).then((response)=>{
                    this.setState({
                        bugs:response.data
                    })
                }).catch(err=>console.log("Error: "+err));
            }
            else
            {
                let data={projectname:this.state.projectname}
                axios.post(this.state.base+'bugs/oneProjectManager',data).then((response)=>{
                    this.setState({
                        bugs:response.data
                    })
                }).catch(err=>console.log("Error: "+err));
            }
        }
    }

    render(){
        
        return(

            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
                </div>

                <div className="bugDiv">
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
                        <div className="text-center">
                            <input type="submit" value="Get Bugs" className="btn btn-primary" />
                        </div>
                    </form>
                </div>

                <div className="bugListDiv">
                    <h3>Logged Bugs</h3>
                    <table className="table">
                        <thead className="thead-light"> 
                            <tr>
                                <th>UserName</th>
                                <th>ProjectName</th>
                                <th>BugSeverity</th>
                                <th>Hardware</th>
                                <th>OS_Version</th>
                                <th>Bug_Summary</th>
                                <th>Tested_Script</th>
                                <th>Date_Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.bugList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default BugTracker