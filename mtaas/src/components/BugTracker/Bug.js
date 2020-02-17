import React from 'react';
import { Tooltip } from 'reactstrap';

class Bug extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            tooltipOpen:false
        }
        this.onToggle=this.onToggle.bind(this);
    }

    onToggle(e)
    {
        this.setState({
            tooltipOpen:!this.state.tooltipOpen
        });
    }
    
    render(){
        let script_component;
        let action_component;
        let link="/editBug/"+this.props.bug._id
        if(this.props.bug.file_url===null)
        {
            script_component=<td>{"No Script Available"}</td>
            if(localStorage.getItem('cookie')==='Manager')
            {
                action_component = <td>{"Cannot Edit/Delete Bug"}</td>
            }
            else if(localStorage.getItem('cookie')==='Admin')
            {
                action_component = 
                    <td>
                        <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBug(this.props.bug._id)}}> Delete</a>
                    </td>
            }
            else{
                action_component = 
                    <td>
                        <a href={link}>Edit</a> |
                        <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBug(this.props.bug._id)}}> Delete</a>
                    </td>
            }
        }
        else if(localStorage.getItem('cookie')==='Manager')
        {
            script_component=
                <td>
                    <a href={this.props.bug.file_url}>Download Script</a>
                </td>
            
            action_component = <td>{"Cannot Edit/Delete Bug"}</td>
        }
        else if(localStorage.getItem('cookie')==='Admin')
        {
            script_component=
                <td>
                    <a href={this.props.bug.file_url}>Download Script</a> | 

                    <span style={{color:"blue"}} href="#" id="TooltipExample"> 
                        <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBugFile(this.props.bug)}}> X</a>
                    </span>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                        Will delete the uploaded file related to the bug report.
                    </Tooltip>
                </td>
            
            action_component = 
                <td>
                    <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBug(this.props.bug._id)}}> Delete</a>
                </td>
        }
        else {
            script_component=
                <td>
                    <a href={this.props.bug.file_url}>Download Script</a> | 

                    <span style={{color:"blue"}} href="#" id="TooltipExample"> 
                        <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBugFile(this.props.bug)}}> X</a>
                    </span>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                        Will delete the uploaded file related to the bug report.
                    </Tooltip>
                </td>
            
            action_component = 
                <td>
                    <a href={link}>Edit</a> |
                    <a href="#" style={{ color: '#DC143C' }} onClick={()=>{this.props.deleteBug(this.props.bug._id)}}> Delete</a>
                </td>
        }
        return(
            <tr>
                <td>{this.props.bug.username}</td>
                <td>{this.props.bug.projectname}</td>
                <td>{this.props.bug.severity}</td>
                <td>{this.props.bug.hardware}</td>
                <td>{this.props.bug.version}</td>
                <td>{this.props.bug.summary}</td>
                {script_component}
                <td>{this.props.bug.date.substring(0,10)}</td>
                {action_component}
            </tr>
        )
    }
}

export default Bug