import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/Navbar";
import "./ProjectOpenings.css";
import {Redirect} from 'react-router';
import { Alert, Tooltip } from 'reactstrap';

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
  Form, FormGroup, Label, Input , Card, CardHeader, CardBody, CardText, CardTitle
} from "reactstrap";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'
let searchFlag=false, redirectNav=null, allProjCards=null, projDetails=[], modal=false;
class Search extends React.Component{
  constructor(props){
    super(props);
    this.searchProject=this.searchProject.bind(this);
  }
  
  searchProject=()=>{
  searchFlag=true;
  this.setState({})
  }
  render()
  {
    if(searchFlag){
      redirectNav=<Redirect to='/filterproject'/>
    }
    return (
      <Form >
        {redirectNav}
      <Row form>
        <Col md={6}>
      <FormGroup>
      <Input type="text" name="seachText" id="searchText" placeholder="Search Technology" />
      </FormGroup>
        </Col>

        <Col md={6}>
        <Button color="success" onClick={this.searchProject}>Submit</Button>
        </Col>
  </Row>
      
 </Form>
  );
  }
}


const ProjectList = props => {
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);

  const toggle = () => setModal(!modal);

  const changeBackdrop = e => {
    let value = e.target.value;
    if (value !== "static") {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>Some Testing App</ModalHeader>
        <ModalBody>
         
         <p><b>Test Case</b></p>
         <ul>
           <li>Test 1 :  Details of test 1</li>
           <li>Test 2 :  Details of test 2</li>
           <li>Test 3 :  Details of test 3</li>
           <li>Test 4 :  Details of test 4</li>
           <li>Test 5 :  Details of test 5</li>
           <li>Test 6 :  Details of test 6</li>
           <li>Test 7 :  Details of test 7</li>
           <li>Test 8 :  Details of test 8</li>
           <li>Test 9 :  Details of test 9</li>
           <li>Test 10 :  Details of test 10</li>
         </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <ListGroup>
      <ListGroupItem>
         <Row>
           <Col className="col-3">
             <img
               src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
               style={{ width: "100%", height: "100%" }}
             ></img>
           </Col>
           <Col className="col-6">
             <ListGroupItemHeading>Starlink project testing</ListGroupItemHeading>
             <ListGroupItemText>
               <p>
                 Donec id elit non mi porta gravida at eget metus. Maecenas sed
                 diam eget risus varius blandit.
               </p>
               <p>
                 {" "}
                 <b>Technologies : Node</b>
               </p>
             </ListGroupItemText>
           </Col>
           <Col className="col-2">
             <ButtonGroup>
               <Button style={{ margin: " 40% 0 0 5%" }} onClick={toggle}>
                 {" "}
                 Details
               </Button>
               <Button color="info" style={{ margin: "40% 0 0 5%" }}>
                 {" "}
                 Apply
               </Button>
             </ButtonGroup>
           </Col>
         </Row>
       </ListGroupItem>
      </ListGroup>
    </div>
  );
};

class ProjectOpenings extends React.Component {
  constructor(props) {
    super(props);
    let token=localStorage.getItem('bearer-token');
    let data={email:localStorage.getItem('email')}
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/getAllProjectsForTester',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then((response) => {
          console.log('allProjs response',response.data)
          let count=0
          if(response.data!=null)
          {
            allProjCards=(response.data).map(item=>{
              console.log('item',item)
              
              let ele=item['project_details']
              if(ele!==undefined)
              {
                let buttonComponent;
                if(localStorage.getItem('cookie')==='Admin')
                {
                    buttonComponent = 
                      <Button className="btn btn-danger" onClick={this.deleteProject.bind(this,item)}>Delete Project</Button>
                }
                else
                {
                  buttonComponent = 
                      <Button color="danger" onClick={this.apply.bind(this,[item['manager_email'],item['project_key']])}>Apply</Button>
                }
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
                      {buttonComponent}
                    </CardBody>
                  </Card>
                  );
              }
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

deleteProject = (project)=>{
  alert('This will delete Project entry, S3 space, related bugs')
  axios.post(hostedAddress+':3001/admin/deleteProject',project)
  .then((response)=>{
    alert('Successfully Deleted!')
    window.location.reload()
  }).catch((err)=>{console.log("error",err)})
}

  render() {
    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="listDiv">
          <div>
                {/* <div>
                  <Search/>     
                </div> */}
           <div>
             <div class="card-arrange">
         {allProjCards}
             </div>
           
           </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectOpenings;
