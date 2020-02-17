import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './AddProject.css';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar'

let name,shortDes,detDesc,compName,address,city,state,zip,testCases,tech,selectedFile, redirectFlag=false;
const ProjectForm = (props) => {
  const nameChangeHandler=(e)=>{
    name=e.target.value;
  }
  const shortDesChangeHandler=(e)=>{
    shortDes=e.target.value;
  }
  const detailedDesChangeHandler=(e)=>{
    detDesc=e.target.value;
  }
  const compNameChangeHandler=(e)=>{
    compName=e.target.value;
  }
  const addressChangeHandler=(e)=>{
    address=e.target.value;
  }
  const cityChangeHandler=(e)=>{
    city=e.target.value;
  }
  const stateChangeHandler=(e)=>{
    state=e.target.value;
  }
  const zipChangeHandler=(e)=>{
    zip=e.target.value;
  }
  const testCaseChangeHandler=(e)=>{
    testCases=e.target.value;
  }
  const techChangeHandler=(e)=>{
    tech=e.target.value;
  }
  const onChangeFileUpload=(e)=>{
    selectedFile=e.target.files[0];
  }
  const addProjHandler=()=>{
    if(name=="" || shortDes==""  || testCases==""  || zip==""   ) {
    // alert('Please fill all details!')
    }else{
      let token=localStorage.getItem('bearer-token');
      //let data={proj_id:localStorage.getItem('username')+"_"+name,email:localStorage.getItem('email'), name:name,shortDes:shortDes,detDesc:detDesc,compName:compName,address:address,city:city,state:state,zip:zip,testCases:testCases,tech:tech}
      let fd=new FormData();
      fd.append('email',localStorage.getItem('email'))
      fd.append('name',name)
      fd.append('shortDes',shortDes)
      fd.append('detDesc',detDesc)
      fd.append('compName',compName)
      fd.append('address',address)
      fd.append('city',city)
      fd.append('state',state)
      fd.append('zip',zip)
      fd.append('testCases',testCases)
      fd.append('tech',tech)
      fd.append('file',selectedFile)
  
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/addProject',fd, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type': 'multipart/form-data'}})
        .then((response) => {
            console.log('addProj response',response)
            window.location.reload()
        })
        .catch(()=>{console.log("error")})
    }
   
  }
  return (
      
    <Form>
        <h3> Add Project</h3>
        <br>
        </br>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="projectname">Project Name</Label>
            <Input type="text" name="projectname" onChange={nameChangeHandler.bind(this)} id="projectname" placeholder="Enter Project Name" />
          </FormGroup>
        </Col>
        <Col md={8}>
          <FormGroup>
            <Label for="projectshort">Short Description</Label>
            <Input type="text" name="projectshort" onChange={shortDesChangeHandler.bind(this)} id="projectshort" placeholder="Enter a brief description about this project" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="detaildesc"> Detailed Description</Label>
        <Input type="textarea" name="detaildesc" onChange={detailedDesChangeHandler.bind(this)} id="detaildesc" placeholder="Enter a detailed description here"/>
      </FormGroup>
      <FormGroup>
        <Label for="company">Company Name</Label>
        <Input type="text" name="company" onChange={compNameChangeHandler.bind(this)} id="company" placeholder="Your Company Name"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress2">Address</Label>
        <Input type="textarea" name="text" onChange={addressChangeHandler.bind(this)}id="exampleText" placeholder="Where is the project based?"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" onChange={cityChangeHandler.bind(this)} id="exampleCity" placeholder='City'/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" onChange={stateChangeHandler.bind(this)} id="exampleState" placeholder='State'/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" onChange={zipChangeHandler.bind(this)} id="exampleZip" placeholder='Zip'/>
          </FormGroup>  
        </Col>
      </Row>
      <FormGroup>
        <Label for="tests">Test Cases</Label>
        <Input type="textarea" name="tests" onChange={testCaseChangeHandler.bind(this)} id="tests" placeholder='Enter a few test cases'/>
      </FormGroup>
      <FormGroup>
        <Label for="tests">Technologies</Label>
      <Input type="textarea" name="tech" onChange={techChangeHandler.bind(this)} id="tech" placeholder="Java, React, Node, MongoDB, AWS EC2 etc..."/>
      </FormGroup>
      <FormGroup row>
        <Label for="image" sm={2}>File</Label>
        <Col sm={10}>
          <Input type="file" name="image" id="image" multiple=""onChange={onChangeFileUpload.bind(this)} />
            <FormText color="muted">
              Upload File for your Project
            </FormText>
        </Col>
      </FormGroup>
      <br></br><br></br>
      <Button color="danger" onClick={addProjHandler}> Add project </Button>
    </Form>
  );
}


class AddProject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
  handleInputChange = () =>{

  }
  
    render() {
      return (
        <div className="mainDiv">
          <div className="navDiv">
            <Navbar />
          </div>
          <div className="listDiv">
            <div>
              <div>
              <ProjectForm/>
              </div>
   
            </div>         
          </div>
        </div>
      );
    }
  }
  



export default AddProject;