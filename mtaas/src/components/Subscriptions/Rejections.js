import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/Navbar";
import "./Subscriptions.css";
import {Redirect} from 'react-router';
import { Alert } from 'reactstrap';

import {
  ButtonGroup,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form, FormGroup, Label, Input , Card, CardHeader, CardBody, CardText, CardTitle, Jumbotron,Container
} from "reactstrap";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
let searchFlag=false, redirectNav=null, allProjCards=null, projDetails=[], modal=false;

class Rejections extends React.Component {
  constructor(props) {
    super(props);
    let token=localStorage.getItem('bearer-token');
    let data={email:localStorage.getItem('email')}
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/getRejectedProjectsForTester',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then((response) => {
          console.log('allProjs response',response.data)
          let count=0
          if(response.data!=null)
          {
            allProjCards=(response.data).map(item=>{
              console.log('item',item)
              let ele=item['project_details']
              if(ele!=undefined)
                return(
                  <Card className="card">
                    {/* <CardHeader>Project | {ele['name']}</CardHeader> */}
                    <CardBody>
                      <h5>{item['project_key']}</h5>
                      <hr/>
                      <CardTitle><b>Manager</b> {item['manager_email']}</CardTitle>
                      <CardTitle><b>About</b> {ele['shortDes']}</CardTitle>
                      <CardText><b>Technologies</b> {ele['tech']}</CardText>
                      <CardText><b>Company Name</b> {ele['compName']}</CardText>
                      <CardText><b>Detailed Description</b> {ele['detDesc']}</CardText>
                      <CardText><b>Address</b> {ele['address']}</CardText>
                      <CardText><b>City</b> {ele['city']}</CardText>
                      <CardText><b>State</b> {ele['state']}</CardText>
                      <CardText><b>Zipcode</b> {ele['zip']}</CardText>
                      <CardText><b>TestCases</b> {ele['testCases']}</CardText>
                  </CardBody>
                  </Card>
                  );
              })
          }
          this.setState({})
      })
      .catch((err)=>{console.log("error",err)})
  }
toggle=()=>{
  modal=!modal
  this.setState({})
}
apply=(arr)=>{
  alert('Your profile will be shared with the Manager. Are you sure you want to apply?')
  let token=localStorage.getItem('bearer-token');
    let data={email:localStorage.getItem('email'),manager_email:arr[0],project_key:arr[1]}
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/applyForProject',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then((response) => {
        alert('Successfully Applied!')
        this.setState({})
      })
      .catch((err)=>{console.log("error",err)})
}
  render() {
    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="homeDiv">
        <div style={{ marginTop: "1%" }}>
            <Jumbotron>
              <Container>
                <h4 className="display-4">Unapproved Applications</h4>
              </Container>
            </Jumbotron>
          </div>
        </div>
        <div className="listDiv">
          <div>           
           <div>
           {allProjCards}
           </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Rejections;
