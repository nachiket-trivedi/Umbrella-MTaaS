import React, { useState, Profiler } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classnames from "classnames";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {hostedAddress} from '../../GlobalVar';

import {
  Jumbotron,
  Media,
  Container,
  ButtonGroup,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

let email, phone, zipcode, bdate, about, address, city, state, git_url, linkedin_url, experience, tech
let db_email, db_phone, db_zipcode, db_bdate, db_about, db_address, db_city, db_state,db_git_url, db_linkedin_url, db_experience, db_tech

const emailChangeHandler=(e)=>{
  email=e.target.value
}
const phoneChangeHandler=(e)=>{
  phone=e.target.value
}
const bdateChangeHandler=(e)=>{
  bdate=e.target.value
}
const aboutChangeHandler=(e)=>{
  about=e.target.value
}
const addressChangeHandler=(e)=>{
  address=e.target.value
}
const cityChangeHandler=(e)=>{
  city=e.target.value
}
const stateChangeHandler=(e)=>{
  state=e.target.value
}
const zipcodeChangeHandler=(e)=>{
  zipcode=e.target.value
}
const gitChangeHandler=(e)=>{
  git_url=e.target.value
}
const linkedinChangeHandler=(e)=>{
  linkedin_url=e.target.value
  console.log(linkedin_url)
}
const expChangeHandler=(e)=>{
  experience=e.target.value
}
const techChangeHandler=(e)=>{
  tech=e.target.value
}

const updatePersonal=()=>{
let data={email:localStorage.getItem('email'), phone:phone, zipcode:zipcode, bdate:bdate, about:about, address:address, city:city, state:state}
console.log('data',data)
axios.defaults.withCredentials=true
axios.post(hostedAddress+":3001/setPersonalProfile",data)
.then((response)=>{
  console.log('response personal',response.data)
  alert('Personal Profile Updated Successfully!')
  window.location.reload()
})
.catch(()=>{
  console.log('error')
})
}
const updateTechnical=()=>{
let data={email:localStorage.getItem('email'),git_url:git_url, linkedin_url:linkedin_url, experience:experience, tech:tech}
axios.defaults.withCredentials=true
axios.post(hostedAddress+":3001/setTechnicalProfile",data)
.then((response)=>{
  console.log('response technical',response.data)
  alert('Technical Profile Updated Successfully!')
  window.location.reload()
})
.catch(()=>{
  console.log('error')
})
}
const PersonalProfileDetails = props => {
  return (
    <div>
      <br></br>


      <FormGroup>
        <Label for="exampleNumber">Contact</Label>
        <Input
          type="number"
          name="number"
          id="exampleNumber"
          onChange={phoneChangeHandler.bind(this)}
          placeholder="Your phone number"
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleDate">Birth Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          onChange={bdateChangeHandler.bind(this)}
          placeholder="Pick Your Birthday"
        />
      </FormGroup>
      <FormGroup>
        <Label for="detaildesc">About</Label>
        <Input
          inactive
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          onChange={aboutChangeHandler.bind(this)}
          placeholder="Some fun fact about you.."
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleAddress2">Address</Label>
        <Input type="textarea" name="text" id="exampleText" placeholder="Your complete address" onChange={addressChangeHandler.bind(this)}/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" placeholder="City" onChange={cityChangeHandler.bind(this)} id="exampleCity" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" placeholder="State" onChange={stateChangeHandler.bind(this)} id="exampleState" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" placeholder="Zipcode" onChange={zipcodeChangeHandler.bind(this)} id="exampleZip" />
          </FormGroup>
        </Col>
      </Row>

      <br></br>

      <Button color="danger" onClick={updatePersonal.bind(this)}> Update Personal Profile</Button>
    </div>
  );
};

const TechnicalProfileDetails = props => {
  return (
    <div>
      <br></br>

      <FormGroup>
        <Label for="exampleUrl">Git Url</Label>
        <Input
          type="url"
          name="url"
          id="exampleUrl"
          onChange={gitChangeHandler.bind(this)}
          placeholder="GitHub ID"
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleUrl">LinkedIn Url</Label>
        <Input
          type="url"
          name="url"
          id="exampleUrl"
          onChange={linkedinChangeHandler.bind(this)}
          placeholder="LinkedIn ID (Ps- we might stalk you :P)"
        />
      </FormGroup>

      <FormGroup>
        <Label for="detaildesc">Experience</Label>
        <Input
          inactive
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          onChange={expChangeHandler.bind(this)}
          placeholder="Your past experiences"
        />
      </FormGroup>

      <FormGroup>
        <Label for="tests">Technologies</Label>
        <Input
          name="tech"
          id="exampleUrl"
          onChange={techChangeHandler.bind(this)}
          placeholder="Enter your tech skills for eg: JMeter Testing, Mocha Testing, Enzyme, Node, Java etc.."
        />
      </FormGroup>
      <br></br>

      <Button color="danger" onClick={updateTechnical.bind(this)}> Update Technical Profile</Button>
    </div>
  );
};

const ProfileTab = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Personal Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Technical Profile
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <PersonalProfileDetails />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <TechnicalProfileDetails />
        </TabPane>
      </TabContent>
    </div>
  );
};

class Profile extends React.Component {
  render() {
    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="homeDiv">
          <Jumbotron>
            <Container>
              <Row>
                <Col className="col-10">
                  <h3>Update Your Profile</h3>
                </Col>
                <Col className="col-2" style={{ float: "right" }}>
                  <Media>
                    <Media
                      object
                      style={{ height: "100px", width: "100px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlYyJhoxpn0uPTkuea1SMnlsFWjWAdahvg7VLON2aL-9nKLWJ&s"
                      alt="Generic placeholder image"
                    />
                  </Media>
                </Col>
              </Row>

              <br></br>

              <p>
                <ProfileTab />
              </p>
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
export default Profile;
