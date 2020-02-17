import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Navbar from '../Navbar/Navbar'  
import "./Community.css"
import { Jumbotron, Container } from 'reactstrap';

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Moar Tabs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}
const JumbotronComponent = (props) => {
  return (
    <div>
      <Jumbotron >
        <Container className="jumbotron-1">
          <h1 className="display-3">Community</h1>
          <p className="lead">Under Construction :)</p>
        </Container>
      </Jumbotron>
    </div>
  );
};
class Community extends React.Component{
    render()
    {
        return(
            <div className="mainDiv">
                <div className="navDiv">
                    <Navbar/>
                </div>
                <div className="homeDiv">
                    <JumbotronComponent/>
                </div>
            </div>
        )
    }
}
export default Community;