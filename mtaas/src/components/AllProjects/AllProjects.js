import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Card, CardBody, Fade,CardFooter,CardHeader, CardText, CardTitle,Jumbotron, Container  } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AllProjects.css';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
let name,shortDes,detDesc,compName,address,city,state,zip,testCases,tech, modal=false, fadeIn=false,Collapse
let allProjCards=null


class AllProjects extends React.Component {
    constructor(props) {
      // alert('constr')
      super(props);
      let token=localStorage.getItem('bearer-token');
      let data={email:localStorage.getItem('email')}
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/viewAllProjects',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then((response) => {
            console.log('allProjs response',response.data)
            allProjCards=null
            if(response.data!=null)
            {
              allProjCards=(response.data).map(item=>{
                console.log('item',item)
                // alert(item)
                return(
                  <Card className="card">
                    <CardHeader>{item['name']}</CardHeader>
                    <CardBody>
                      <CardTitle><b>About</b> {item['shortDes']}</CardTitle>
                      <CardText><b>Technologies</b> {item['tech']}</CardText>
                      <CardText><b>Detailed Description</b> {item['detDesc']}</CardText>
                      <CardText><b>Company Name</b> {item['compName']}</CardText>
                      <CardText><b>Address</b> {item['address']}</CardText>
                      <CardText><b>City</b> {item['city']}</CardText>
                      <CardText><b>State</b> {item['state']}</CardText>
                      <CardText><b>Zipcode</b> {item['zip']}</CardText>
                      <CardText><b>TestCases</b> {item['testCases']}</CardText>
                      <CardText><b>Working Testers</b> {item['testers_involved'].join()}</CardText>
                      <Button  className="btn" color="danger" onClick={this.remove.bind(this,item['name'])}>Remove</Button>
                    </CardBody>
                  </Card>
                  );
              })
            }
            this.setState({})
        })
        .catch(()=>{console.log("error")})
    }
    remove=(name)=>{
      alert('This will delete Project entry, S3 space, related bugs')
      let data={projectname:name}
      console.log('Project Removal Manager: ')
      console.log(data)
      axios.post(hostedAddress+':3001/admin/deleteProject',data)
        .then((response) => {
          console.log('deleted',response.data)
          window.location.reload()
        })
        .catch(()=>{console.log("error")})
    }
    render() {
      // alert('render')
      // let token=localStorage.getItem('bearer-token');
      // let data={email:localStorage.getItem('email')}
      // axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      // axios.post(hostedAddress+':3001/viewAllProjects',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      //   .then((response) => {
      //       console.log('allProjs response',response.data)
      //       allProjCards=null
      //       if(response.data!=null)
      //       {
      //         allProjCards=(response.data).map(item=>{
      //           console.log('item',item)
      //           return(
      //             <Card className="card">
      //               <CardHeader>{item['name']}</CardHeader>
      //               <CardBody>
      //                 <CardTitle><b>About</b> {item['shortDes']}</CardTitle>
      //                 <CardText><b>Technologies</b> {item['tech']}</CardText>
      //                 <CardText><b>Detailed Description</b> {item['detDesc']}</CardText>
      //                 <CardText><b>Company Name</b> {item['compName']}</CardText>
      //                 <CardText><b>Address</b> {item['address']}</CardText>
      //                 <CardText><b>City</b> {item['city']}</CardText>
      //                 <CardText><b>State</b> {item['state']}</CardText>
      //                 <CardText><b>Zipcode</b> {item['zip']}</CardText>
      //                 <CardText><b>TestCases</b> {item['testCases']}</CardText>
      //                 <Button className="btn1" color="info" >View</Button>
      //                 <Button  className="btn2" color="danger" onClick={this.remove.bind(this,item['name'])}>Remove</Button>
      //               </CardBody>
      //             </Card>
      //             );
      //         })
      //       }
      //   })
      //   .catch(()=>{console.log("error")})
      return (
        <div className="mainDiv">
          <div className="navDiv">
            <Navbar />
          </div>
          <div style={{marginTop:"1%"}}>
          <Jumbotron>
        <Container>
          <span style={{marginLeft:"2px"}}> <h4 className="display-4">My Projects</h4></span>
          <span class="right-button"><a href="/addProject"> <Button color="danger"> Add</Button></a></span>
        </Container>
      </Jumbotron>
            <div>
            <div class="card-arrange">
              <Container>
                {allProjCards}
              </Container>
                </div>
            </div>         
          </div>
        </div>
      );
    }
  }
  



export default AllProjects;