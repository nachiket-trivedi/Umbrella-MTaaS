import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/Navbar";
import "./SearchTester.css";

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
  Form, FormGroup, Label, Input 
} from "reactstrap";

let searchFlag=false;
let redirectNav=null;

class Search extends React.Component{

constructor(props){
super(props);
this.searchTester=this.searchTester.bind(this);
}

searchTester=()=>{
searchFlag=true;
}

render(){

  return (
    <Form >
      {redirectNav}
      <Row form>
        <Col md={6}>
      <FormGroup>
      <Input type="text" name="seachText" id="searchText" placeholder="Search Tester based on Technology" />
      </FormGroup>
        </Col>

        <Col md={6}>
        <Button>Submit</Button>
        </Col>
  </Row>
      
 </Form>
  );
}
}

const TesterList = props => {
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
        <ModalHeader toggle={toggle}>Tester Name </ModalHeader>
        <ModalBody>
         
         <p><b>About Tester</b></p>
         <p> Bleh blehhhhh</p>
         <a href="#">Resume Link</a>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>
            Contact
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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
              <ListGroupItemHeading>John Kennedy</ListGroupItemHeading>
              <ListGroupItemText>
                <p>
                  Hi, I'm a java developer
                </p>
                <p>
                  {" "}
                  <b>Technology : Java</b>
                </p>
              </ListGroupItemText>
            </Col>
            <Col className="col-4">
              <ButtonGroup>
                <Button style={{ margin: " 40% 0 0 5%" }} onClick={toggle}> Details</Button>

                <Button color="info" style={{ margin: "40% 0 0 5%" }}>
                  {" "}
                  Add 
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </ListGroupItem>
        
      </ListGroup>
    </div>
  );
};

const ModalExample = props => {
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
      

      <TesterList/>
    </div>
  );
};

//let currArr=[];

// const ProjectList = props => {
//   return (

//   );
// };

class FilterTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //for pagination
      paginated_projects: null,
      results_per_page: 5,
      num_pages: 0,
      status: [],
      inc: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    // currArr = projectArr.slice(0, this.state.results_per_page);
    // const pages = Math.ceil(projectArr.length / this.state.results_per_page);
    const pages = 5;
    this.setState({
      num_pages: pages
      // paginated_projects: currArr
    });
  }



  
  handlePageClick(data) {
    // console.log(data.selected);
    // let page_number = data.selected;
    // let offset = Math.ceil(page_number * this.state.results_per_page);
    // currArr = projectArr.slice(offset, offset + this.state.results_per_page);
    // this.setState({
    //     paginated_projects: currArr
    // });
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
            <Search/>
            </div>
           
           <div>
           <ModalExample />
           </div>
            
          </div>

          <div style={{ margin: "30px" }}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.num_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterTester;
