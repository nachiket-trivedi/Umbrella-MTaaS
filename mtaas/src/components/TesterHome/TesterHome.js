import React from "react";
import "./TesterHome.css";
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
if(localStorage.getItem('role')=="Tester"){
  axios.post(hostedAddress + ":3001/getTesterAnnouncement", data).then(response => {
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
        <Jumbotron>
        <Container>
       
        <br></br>
          <h4 className="display-4">Announcements</h4>
        </Container>
      </Jumbotron>
      <p className="lead"> 
            <AnnouncementList />    
          </p>
        </div>
      </div>
    );
  }
}
export default Home;


// Be sure to include styles at some point, probably during your bootstraping

/*


*/
