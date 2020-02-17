import React from 'react'
import Card from 'react-bootstrap/Card'
import Navbar from "../Navbar/Navbar";
import './managerBilling.css'
import PayPalComponent from '../PayPal/PayPalComponent'
import {Jumbotron,Container,ListGroup,ListGroupItem} from 'reactstrap'

const GlobalVar = require("../../GlobalVar");

class ManagerBilling extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar />
               </div>
               <div className="homeDiv">
                    <div>
                       
                        <div style={{ marginTop: "1%" }}>
              <Jumbotron>
                <Container>
                <h3 className="display-4">Platform Billing Rates</h3>
                </Container>
              </Jumbotron>
                            {/* <Jumbotron>
                                <Container>
                                    <h3 className="display-4">Platform Billing Rates</h3>
                                </Container>
                            </Jumbotron> */}
                            </div>
                            <Container>
                            <p>
                                <div>
                                    <Card bg="danger" text="white" style={{ marginTop:"2%", width: '30rem', display:"flex",flexWrap:"wrap"  }}>
                                        <Card.Header><h3>File Storage Rates</h3></Card.Header>
                                        <Card.Body style={{backgroundColor:"white", color:"black"}}>
                                        <Card.Text>
                                            <h5>
                                                File Storage: <b>$0.030 per MB</b>
                                                <br />
                                                File Monitor: <b>$0.20 per 100 objects</b>
                                            </h5>
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>

                                    <br />

                                    <Card bg="danger" text="white" style={{ marginTop:"0",width: '30rem',display:"flex", flexWrap:"wrap" }}>
                                        <Card.Header><h3>Database Instance</h3></Card.Header>
                                        <Card.Body style={{backgroundColor:"white", color:"black"}}>
                                        <Card.Text>
                                            <h5>
                                                Information Storage: <b>$0.20 per hour</b>
                                                <br />
                                                Information Transfer: <b>$0.15 per MB</b>
                                            </h5>
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>

                                </div>
                            </p>
                            <PayPalComponent/>
                        </Container>
                    </div>
               </div>
            </div>
        )
    }
}

export default ManagerBilling