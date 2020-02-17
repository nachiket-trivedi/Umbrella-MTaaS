import React from "react";
import "./Home.css";
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
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Dropdown from "react-dropdown";
import { hostedAddress } from "../../GlobalVar";
import axios from "axios";

// Be sure to include styles at some point, probably during your bootstraping

class Announcement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      announcementBody: "",
      announcementProject: "",
      projectMap:[]
    };
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    const data = {
      email: localStorage.getItem("email")
    };
    console.log("Hi there");
    console.log(data);

    axios.post(hostedAddress + ":3001/getProjects", data).then(response => {
      //update the state with the response data
      console.log("here");
      console.log(response.data);
      let o = [];
      let temp = response.data.map(proj => {
        o.push(proj.value);
      });
      this.setState({
        projectList: o,
        projectMap:response.data
      });
    });
  }

  sendAnnouncement = () => {
    if (
      this.state.announcementBody == "" ||
      this.state.announcementProject == ""
    ) {
      alert("Please fill all details!");
    } else {
    var scid;
    //console.log()
    for(var i=0;i<this.state.projectList.length;i++){
        if(this.state.announcementProject== this.state.projectMap[i].value){
         scid=this.state.projectMap[i].key;
        break;
        }
    }
      //alert(this.state.announcementBody+" "+this.state.announcementProject)

      axios.defaults.withCredentials = true;
      const data = {
        manager:localStorage.getItem('name'),
        managerEmail:localStorage.getItem('email'),
        announcementBody: this.state.announcementBody,
        announcementProject: this.state.announcementProject,
        projectID:scid
      };

     // alert(data.projectID)
      console.log("Hi there");
      console.log("This",data);

      axios
        .post(hostedAddress + ":3001/sendAnnouncement", data)
        .then(response => {
          console.log("here");
          console.log(response.data);
alert(response.data);
          window.location.reload();
        });
    }
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  sectionChangeHandler = value => {
    console.log(value.value);
    this.setState({
      announcementProject: value.value
    });
  };

  render() {
    return (
      <div>
        {/* <Button color="success">Add Project</Button> */}
        <Jumbotron>
          <Container>
          <h4 className="display-4">Announcements</h4>
          <br></br>
            <div>
              <h4 style={{ marginLeft: "1%" }}>Create Announcement</h4>

              <Form inline>
                <FormGroup className="col-6">
                  <Input
                    type="text"
                    name="announcementBody"
                    style={{ width: "100%" }}
                    placeholder="Write Announcement"
                    onChange={this.inputChangeHandler.bind(this)}
                  />
                </FormGroup>
                <FormGroup className="col-3">
                  <Label for="selectProject">Project </Label>
                  <Dropdown
                    ref={ref => (this.announcementProject = ref)}
                    options={this.state.projectList}
                    onChange={this.sectionChangeHandler}
                    name="announcementProject"
                    placeholder="Project"
                    value={this.state.announcementProject}
                  />
                  {/* <Input
                    type="select"
                    name="selectProject"
                    id="selectProject"
                    style={{ width: "70%" }}
                  >
                    <option>Projects </option>
                  </Input> */}
                </FormGroup>
                <Button
                  className="col-2"
                  color="danger"
                  onClick={this.sendAnnouncement}
                >
                  Send
                </Button>
              </Form>
            </div>
            <br></br>
           
            <p className="lead">{/* <AnnouncementList /> */}</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

class AnnouncementList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      announcementList:[]
    }
    this.removeAnnouncement = this.removeAnnouncement.bind(this);
  }

  componentWillMount() {
    axios.defaults.withCredentials = true;

    const data = {
      email: localStorage.getItem("email")
    };
    console.log("Hi there");
    console.log(data);
// if(localStorage.getItem('role')=="Tester"){
//   axios.post(hostedAddress + ":3001/getTesterAnnouncement", data).then(response => {
//     console.log("here");
//     console.log(response.data);

//     this.setState({
// announcementList:response.data
//     });
//   });
// }else 
if(localStorage.getItem('role')=="Manager"){
  axios.post(hostedAddress + ":3001/getManagerAnnouncement", data).then(response => {
    //update the state with the response data
    console.log("here");
    console.log(response.data);

    this.setState({
announcementList:response.data
    });
  });
}
    
  }

  removeAnnouncement=(v)=>{
    //alert(v)
    console.log(v)
    axios.defaults.withCredentials = true;
    const data = {
      email: localStorage.getItem("email"),
      id:v._id
    };
    console.log("Hi there");
    console.log(data);
    axios.post(hostedAddress + ":3001/removeAnnouncement", data).then(response => {
    //update the state with the response data
    console.log("here");
    console.log(response.data);
    alert("Removed Announcement")
    window.location.reload();
  });
  }

  render() {
    let newListItem = [];
    if (this.state.announcementList.length!=0) {
this.state.announcementList.map(item=>{
  newListItem.push(
    <ListGroupItem>
      <Row>
        {/* <Col className="col-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHlYyJhoxpn0uPTkuea1SMnlsFWjWAdahvg7VLON2aL-9nKLWJ&s"
            style={{ width: "100px", height: "120px" }}
          ></img>
        </Col> */}
        <Col className="col-10">
          <ListGroupItemHeading>Project : {item.project}</ListGroupItemHeading>
          <ListGroupItemText>
            <p>{item.message}</p>
            <p>
              {" "}
              <b>Manager :  {item.manager}</b>
            </p>
          </ListGroupItemText>
        </Col>
        <Col style={{float:"right"}} className="col-2">
          <ButtonGroup>
            {/* <Button
              style={{ margin: " 40% 0 0 5%" }}
              color="info"
              onClick={this.flagShit}
            >
              {" "}
              Flag
            </Button> */}
            <Button
              style={{ margin: " 40% 0 0 5%" }}
              color="danger"
              onClick={this.removeAnnouncement.bind(this,item)}
            >
              {" "}
              Remove
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </ListGroupItem>
  );
})
    
    }else{
     newListItem.push(<h3 style={{textAlign:"center"}}><b>No Announcements!!</b> </h3>)
    }
    return (
      <div>
        <Container>
        <ListGroup>
          {newListItem}
        </ListGroup>

         </Container>
        
      </div>
    );
  }
}
class Home extends React.Component {
  render() {
    return (
      <div className="mainDiv">
        <div className="navDiv">
          <Navbar />
        </div>
        <div className="homeDiv">
          <Announcement />
          <AnnouncementList/>
        </div>
      </div>
    );
  }
}
export default Home;
