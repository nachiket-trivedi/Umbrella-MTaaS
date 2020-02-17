import React, { useState } from "react";
import "./ViewProject.css";
import {
  Jumbotron,
  Container,
  ButtonGroup,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import classnames from "classnames";
import Navbar from "../Navbar/Navbar";
import ApprovalList from "../ApprovalList/ApprovalList";
// Be sure to include styles at some point, probably during your bootstraping

const ProjectDetails = props => {
  return (
    <div>
    
      <Row form>
        <Col>
          <FormGroup>
            <Label for="projectname">Short Description</Label>
            <Input
              inactive
              type="text"
              name="projectname"
              id="projectname"
              placeholder="Project Name"
              value="Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit."
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="detaildesc">Project Detailed Description</Label>
        <Input
          inactive
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          value=" Donec id elit non mi porta gravida at eget metus. Maecenas sed diam
            eget risus varius blandit. Donec id elit non mi porta gravida at
            eget metus. Maecenas sed diam eget risus varius blandit. Donec id
            elit non mi porta gravida at eget metus. Maecenas sed diam eget
            risus varius blandit. Donec id elit non mi porta gravida at eget
            metus. Maecenas sed diam eget risus varius blandit. Donec id elit
            non mi porta gravida at eget metus. Maecenas sed diam eget risus
            varius blandit. Donec id elit non mi porta gravida at eget metus.
            Maecenas sed diam eget risus varius blandit."
        />
      </FormGroup>
      <FormGroup>
        <Label for="company">Company Name</Label>
        <Input
          inactive
          type="text"
          name="company"
          id="company"
          placeholder="Company Name"
          value=" Some awesome company"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress2">Address</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" id="exampleCity" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" id="exampleZip" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="tests">Test Cases</Label>
        <Input type="textarea" name="tests" id="tests" />
      </FormGroup>

      <FormGroup>
        <Label for="tests">Technologies</Label>
        <br></br>
        <Row>
          <Col>~Javascript</Col>
          <Col>Javascript</Col>
          <Col>Javascript</Col>
          <Col>Javascript</Col>
          <Col>Javascript</Col>
          <Col>Javascript</Col>
          <Col>Javascript</Col>
        </Row>

        {/* <Input
        inactive
          type="textarea"
          name="tech"
          id="tec"
          placeholder="Mention Other Tecchnologies - separate by comma(,)"
          value="Some list"
        /> */}
      </FormGroup>
      <br></br>

      <Button color="info"> Edit project </Button>
      
    </div>
  );
};

const ProjectDetailsEdit = props => {
  return (
    <div>
      <br></br>
      <Row form>
        <Col>
          <FormGroup>
            <Label for="projectname">Short Description</Label>
            <Input
              type="text"
              name="projectname"
              id="projectname"
              placeholder="Project Name"
              value=""
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="detaildesc">Project Detailed Description</Label>
        <Input
          type="textarea"
          name="detaildesc"
          id="detaildesc"
          value=""
        />
      </FormGroup>
      <FormGroup>
        <Label for="company">Company Name</Label>
        <Input
          type="text"
          name="company"
          id="company"
          placeholder="Company Name"
          value=""
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress2">Address</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" id="exampleCity" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" id="exampleZip" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="tests">Test Cases</Label>
        <Input type="textarea" name="tests" id="tests" />
      </FormGroup>

      <FormGroup>
        <Label for="tests">Technologies</Label>
        <br></br>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> Javascript
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> Java
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> SQL
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> MongoDB
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> C
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> C++
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> ObjectiveC
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> ReactJS
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> NodeJS
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> VueJS
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" /> Kafka
          </Label>
          <br></br>
          <br></br>
        </FormGroup>
        <Input
          type="textarea"
          name="tech"
          id="tec"
          placeholder="Mention Other Tecchnologies - separate by comma(,)"
        />
      </FormGroup>

      <br></br>
      <ButtonGroup>
        <Button color="info" style={{ margin: " 40% 0 0 5%" }}>
          {" "}
          Update{" "}
        </Button>
        <Button style={{ margin: " 40% 0 0 5%" }}> Cancel </Button>
      </ButtonGroup>
    </div>
  );
};

const ProjectTab = props => {
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
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Testers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Directory
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Bugs Reported
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Pending Approval List
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <ProjectDetails />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <TesterList />
        </TabPane>
        <TabPane tabId="3">
          <br></br>
          <h3>Working on the Directory!</h3>
          <p>Patience is appreciated :)</p>
        </TabPane>
        <TabPane tabId="4">
          <br></br>
          <h3>Working on the Bugs Management!</h3>
          <p>Patience is appreciated :)</p>
        </TabPane>
        <TabPane tabId="5">
          <br></br>
          <ApprovalList/>
        </TabPane>
      </TabContent>
    </div>
  );
};

const TesterList = props => {
  return (
    <div>
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col className="col-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlYyJhoxpn0uPTkuea1SMnlsFWjWAdahvg7VLON2aL-9nKLWJ&s"
                style={{ width: "100px", height: "120px" }}
              ></img>
            </Col>
            <Col className="col-6">
              <ListGroupItemHeading>Tester Name</ListGroupItemHeading>
              <ListGroupItemText>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
                <p>
                  {" "}
                  <b>Project : Project name</b>
                </p>
              </ListGroupItemText>
            </Col>
            <Col className="col-4">
              <ButtonGroup>
                <Button style={{ margin: " 40% 0 0 5%" }}> Details</Button>

                <Button color="danger" style={{ margin: "40% 0 0 5%" }}>
                  {" "}
                  Remove
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col className="col-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlYyJhoxpn0uPTkuea1SMnlsFWjWAdahvg7VLON2aL-9nKLWJ&s"
                style={{ width: "100px", height: "120px" }}
              ></img>
            </Col>
            <Col className="col-6">
              <ListGroupItemHeading>Tester Name</ListGroupItemHeading>
              <ListGroupItemText>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
                <p>
                  {" "}
                  <b>Project : Project name</b>
                </p>
              </ListGroupItemText>
            </Col>
            <Col className="col-4">
              <ButtonGroup>
                <Button style={{ margin: " 40% 0 0 5%" }}> Details</Button>

                <Button color="danger" style={{ margin: "40% 0 0 5%" }}>
                  {" "}
                  Remove
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};
class ViewProject extends React.Component {
  render() {
    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="homeDiv">
          
            <Container>
              <Row>
                <Col>
                  <h3>Project Name</h3>
                </Col>
                <Col>
                  <Button color="danger" style={{ float: "right" }}>
                    {" "}
                    Delete Project
                  </Button>
                </Col>
              </Row>
              <br></br>
              <p>
                <ProjectTab />
              </p>
            </Container>
          
        </div>
      </div>
    );
  }
}
export default ViewProject;
