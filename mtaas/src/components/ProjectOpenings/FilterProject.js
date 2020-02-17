import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Navbar/Navbar";
import "./ProjectOpenings.css";
import {Redirect} from 'react-router';

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

let searchFlag=false, redirectNav=null;
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
        <Button onClick={this.searchProject}>Submit</Button>
        </Col>
  </Row>
      
 </Form>
  );
  }
}


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

//let currArr=[];

// const ProjectList = props => {
//   return (

//   );
// };

class FilterProject extends React.Component {
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

export default FilterProject;
