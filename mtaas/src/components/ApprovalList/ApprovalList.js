import React from "react";
import "./ApprovalList.css";
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
  Table
} from "reactstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { hostedAddress } from "../../GlobalVar";
let dispCard = [];
let modalView = null;
let testerInfo = {};

class ApprovalList extends React.Component {
  constructor(props) {
    super(props);
    let data = { email: localStorage.getItem("email") };
    let count = 0;
    this.state = {
      testerInfo: {},
      modalOpen: false
    };
    axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress + ":3001/getPendingList", data).then(response => {
      console.log("get pending list response", response.data);
      let arr = response.data;
      // arr.splice(-1,1)
      console.log("arr", arr);
      for (let element of arr) {
        let item = element[0];
        let arr1 = element[1];
        console.log("item", item);
        console.log("arr1", arr1);
        if (arr1)
          dispCard[count++] = arr1.map(ele => {
            console.log("ele", ele);
            return (
              <ListGroupItem>
                <Row>
                  <Col className="col-2">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlYyJhoxpn0uPTkuea1SMnlsFWjWAdahvg7VLON2aL-9nKLWJ&s"
                      style={{ width: "100px", height: "120px" }}
                    ></img>
                  </Col>
                  <Col className="col-6">
                    <ListGroupItemHeading>{ele}</ListGroupItemHeading>
                    <ListGroupItemText>
                      <p></p>
                      <p>
                        {" "}
                        <b>Project : {item}</b>
                      </p>
                    </ListGroupItemText>
                  </Col>
                  <Col className="col-4">
                    <ButtonGroup>
                      <Button
                        style={{ margin: "40% 0 0 5%" }}
                        onClick={this.viewTester.bind(this, ele)}
                      >
                        View
                      </Button>
                      {/* <ModalViewTester email={ele}/> */}
                      {/* {modalView} */}
                      <Button
                        color="info"
                        style={{ margin: "40% 0 0 5%" }}
                        onClick={this.approveHandler.bind(this, [ele, item])}
                      >
                        {" "}
                        Approve
                      </Button>
                      <Button
                        color="danger"
                        style={{ margin: "40% 0 0 5%" }}
                        onClick={this.rejectHandler.bind(this, [ele, item])}
                      >
                        {" "}
                        Reject
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          });
      }
      this.setState({});
    });
  }

  
  viewTester = email => {
    // alert(
    //   email
    // )
    let data = { email: email };
    axios.defaults.withCredentials = true;
    axios.post(hostedAddress + ":3001/getProfile", data).then(response => {
      console.log(response.data)
      this.setState({
        testerInfo: response.data,
        modalOpen: true
      });
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  approveHandler = arr => {
    let testerEmail = arr[0],
      project_key = arr[1];
    let data = {
      email: localStorage.getItem("email"),
      testerEmail: testerEmail,
      project_key: project_key
    };
    let count = 0;
    axios.defaults.withCredentials = true;
    axios.post(hostedAddress + ":3001/approveTester", data).then(response => {
      alert("This Tester is approved!");
      window.location.reload();
    });
  };
  rejectHandler = arr => {
    let testerEmail = arr[0],
      project_key = arr[1];
    let data = {
      email: localStorage.getItem("email"),
      testerEmail: testerEmail,
      project_key: project_key
    };
    let count = 0;
    axios.defaults.withCredentials = true;
    axios.post(hostedAddress + ":3001/rejectTester", data).then(response => {
      alert("This Tester is rejected!");
      window.location.reload();
    });
  };
  approveHandler = arr => {
    let testerEmail = arr[0],
      project_key = arr[1];
    let data = {
      email: localStorage.getItem("email"),
      testerEmail: testerEmail,
      project_key: project_key
    };
    let count = 0;
    axios.defaults.withCredentials = true;
    axios.post(hostedAddress + ":3001/approveTester", data).then(response => {
      alert("This Tester is approved!");
      window.location.reload();
    });
  };
  rejectHandler = () => {
    alert("Tester rejected:(");
  };

  render() {
    let modalView = null;
    if (this.state.modalOpen) {
      modalView = (
        <Table>
          <tbody>
            <tr>
              <th scope="row">Email</th>
              <td>{this.state.testerInfo["email"]}</td>
            </tr>
            <tr>
              <th scope="row">About</th>
              <td>{this.state.testerInfo["about"]}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{this.state.testerInfo["address"]}</td>
            </tr>
            <tr>
              <th scope="row">Birthdate</th>
              <td>{this.state.testerInfo["bdate"]}</td>
            </tr>
            <tr>
              <th scope="row">Phone</th>
              <td>{this.state.testerInfo["phone"]}</td>
            </tr>
            <tr>
              <th scope="row">City</th>
              <td>{this.state.testerInfo["city"]}</td>
            </tr>
            <tr>
              <th scope="row">State</th>
              <td>{this.state.testerInfo["state"]}</td>
            </tr>
            <tr>
              <th scope="row">Zipcode</th>
              <td>{this.state.testerInfo["zipcode"]}</td>
            </tr>
            <tr>
              <th scope="row">Experience</th>
              <td>{this.state.testerInfo["experience"]}</td>
            </tr>
            <tr>
              <th scope="row">LinkedIn</th>
              <td>{this.state.testerInfo["linkedin_url"]}</td>
            </tr>
            <tr>
              <th scope="row">GitHub</th>
              <td>{this.state.testerInfo["git_url"]}</td>
            </tr>
            <tr>
              <th scope="row">Total Working Projects</th>
              <td>{this.state.testerInfo["project_involved"].length}</td>
            </tr>
            <tr>
              <th scope="row">Project Acceptance Index</th>
              <td>
                {(this.state.testerInfo["project_involved"].length /
                  this.state.testerInfo["applied_project"].length) *
                  100}{" "}
                %
              </td>
            </tr>
            <tr>
              <th scope="row">Technologies</th>
              <td>{this.state.testerInfo["tech"]}</td>
            </tr>
          </tbody>
        </Table>
      );
    }

    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div>
          <div style={{ marginTop: "1%" }}>
            <Jumbotron>
              <Container>
                <h4 className="display-4">Pending Approvals</h4>
              </Container>
            </Jumbotron>
            <p>
              {/* <div><Container>{modalView}</Container></div> */}
              <div>
                <Container>{dispCard}</Container>
              </div>
            </p>
          </div>
          <Modal show={this.state.modalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h6>
                <b>Tester Details</b>
              </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalView}</Modal.Body>
        </Modal>
        </div>
        {/* {modalView} */}
      
      </div>
    );
  }
}
export default ApprovalList;
