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
          value={phone}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleDate">Birth Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          value={bdate}
        />
      </FormGroup>
      <FormGroup>
        <Label for="detaildesc">About</Label>
        <Input
          inactive
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          value={about}
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleAddress2">Address</Label>
        <Input type="textarea" name="text" id="exampleText" value={address} />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" value={city}  id="exampleCity" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" value={state}  id="exampleState" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" value={zipcode}  id="exampleZip" />
          </FormGroup>
        </Col>
      </Row>

      <br></br>

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
          value={git_url}        
          />
      </FormGroup>

      <FormGroup>
        <Label for="exampleUrl">LinkedIn Url</Label>
        <Input
          type="url"
          name="url"
          id="exampleUrl"
          value={linkedin_url}
        />
      </FormGroup>

      <FormGroup>
        <Label for="detaildesc">Experience</Label>
        <Input
          inactive
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          value={experience}
        />
      </FormGroup>

      <FormGroup>
        <Label for="tests">Technologies</Label>
        <Input
          name="tech"
          id="exampleUrl"
          value={tech}
        />
      </FormGroup>
      <br></br>

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

class ShowProfile extends React.Component {
    constructor(props)
    {
        super(props)
        let data={email:localStorage.getItem('email')}
        axios.defaults.withCredentials=true
        axios.post(hostedAddress+":3001/getProfile",data)
        .then((response)=>{
            console.log('response:', response.data)
            phone=response.data['phone']
            bdate=response.data['bdate']
            address=response.data['address']
            about=response.data['about']
            city=response.data['city']
            state=response.data['state']
            zipcode=response.data['zipcode']
            git_url=response.data['git_url']
            linkedin_url=response.data['linkedin_url']
            experience=response.data['experience']
            tech=response.data['tech']
            this.setState({})
        })
        .catch(()=>{console.log('error')})
    }
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
                  <h3>{localStorage.getItem('name')}</h3>
                  <br>
                  </br>
                  <a href="/profile"> <Button color="danger"> Update</Button></a>
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
export default ShowProfile;
