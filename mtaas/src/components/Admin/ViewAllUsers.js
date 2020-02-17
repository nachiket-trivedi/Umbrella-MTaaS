import React from "react"
import Navbar from "../Navbar/Navbar";
import "./ViewAllUsers.css";
import axios from 'axios';
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";

let allUserCards=null;
const GlobalVar = require('../../GlobalVar')


class ViewAllUsers extends React.Component{
    
    constructor(props)
    {
        super(props)
        axios.get(GlobalVar.server_base_url+'admin/getAllUser')
        .then((response)=>{
            console.log('All users response')
            console.log(response)
            if(response.data!=null)
            {
                allUserCards = response.data.map((user)=>{
                    console.log('Each user: '+user)
                    let buttonComponent;
                    if(user.role==='Tester')
                    {
                        buttonComponent = 
                            <Button className="btn btn-danger" onClick={this.deleteTester.bind(this,user)}>Delete User</Button>
                    }
                    else if(user.role==='Manager')
                    {
                        buttonComponent = 
                            <Button className="btn btn-danger" onClick={this.deleteManager.bind(this,user)}>Delete User</Button>
                    }
                    return(
                        <Card className="card">
                            <CardBody>
                                <h5>{user.name}</h5>
                                <hr/>
                                <CardTitle><b>Email: </b> {user.email}</CardTitle>
                                <CardTitle><b>Phone: </b> {user.phone}</CardTitle>
                                <CardText><b>Zipcode: </b> {user.zipcode}</CardText>
                                <CardText><b>Username: </b> {user.username}</CardText>
                                <CardText><b>User-Role: </b> {user.role}</CardText>
                                {buttonComponent}
                            </CardBody>
                        </Card>
                    );
                })
            }
            this.setState({})
        }).catch((err)=>{
            console.log('Error in fetching admin getAllUser: '+err)
        })
    }

    deleteTester = (user)=>{
        alert('This will delete Tester entry, S3 space, related bugs')
        axios.post(GlobalVar.server_base_url+'admin/deleteTester',user)
        .then((response)=>{
            alert('Successfully Deleted!')
            window.location.reload()
        }).catch((err)=>{console.log("error",err)})
    }

    deleteManager = (user)=>{
        alert('This will delete Manager entry, S3 space, related bugs')
        axios.post(GlobalVar.server_base_url+'admin/deleteManager',user)
        .then((response)=>{
            alert('Successfully Deleted!')
            window.location.reload()
        }).catch((err)=>{console.log("error",err)})
    }

    render()
    {
        return(
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
                </div>
                <div className="listDiv">
                    {allUserCards}
                </div>
            </div>
        );
    }
}

export default ViewAllUsers


