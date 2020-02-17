import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Card, CardBody, Fade,CardFooter,CardHeader, CardText, CardTitle,Jumbotron, Container  } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ManagerSubscription.css';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
let name,shortDes,detDesc,compName,address,city,state,zip,testCases,tech, allProjCards=null, modal=false, fadeIn=false,Collapse


class ManagerSubscription extends React.Component {
    constructor(props) {
      super(props);
      let token=localStorage.getItem('bearer-token');
      let data={email:localStorage.getItem('email')}
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/viewAllProjects',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then((response) => {
            console.log('allProjs response',response.data)
            if(response.data!=null)
            {
              allProjCards=(response.data).map(item=>{
                console.log('item',item)
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
                      <Button className="btn1" color="info" >View</Button>
                      <Button  className="btn2" color="danger" onClick={this.remove.bind(this,item['name'])}>Remove</Button>
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
      let token=localStorage.getItem('bearer-token');
      let data={email:localStorage.getItem('email'), proj_id:localStorage.getItem('username')+"_"+name}
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/deleteProject',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then((response) => {
          console.log('deleted',response.data)
        })
        .catch(()=>{console.log("error")})
        window.location.reload()
    }
    render() {
      return (
        <div className="mainDiv">
          <div className="navDiv">
            <Navbar />
          </div>
          <div className="listDiv">
          <Jumbotron fluid>
        <Container fluid>
          <h3 className="display-3">Active Projects</h3>
        </Container>
      </Jumbotron>
            <div>
                {allProjCards}
            </div>         
          </div>
        </div>
      );
    }
  }
  



export default ManagerSubscription;