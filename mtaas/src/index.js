import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home/Home";
import TesterHome from "./components/TesterHome/TesterHome";
import AddProject from "./components/AddProject/AddProject";
import AllProjects from "./components/AllProjects/AllProjects";
import Profile from "./components/Profile/Profile";
import ShowProfile from "./components/Profile/ShowProfile";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectOpenings from "./components/ProjectOpenings/ProjectOpenings";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import Rejections from "./components/Subscriptions/Rejections";
import ManagerSubscription from "./components/ManagerSubscription/ManagerSubscription";
import Dashboard from "./components/Dashboard/Dashboard";
import Community from "./components/Community/Community";
import ApprovalList from "./components/ApprovalList/ApprovalList";
import ViewProject from "./components/ViewProject/ViewProject";
import SearchTester from "./components/SearchTester/SearchTester";
import FilterTester from "./components/SearchTester/FilterTester";
import FilterProject from "./components/ProjectOpenings/FilterProject";
import ManagerBilling from './components/Billing/managerBilling'
import Landing from './components/Landing/Landing';
import Landing1 from './components/Landing/Landing1';

import Login from "./components/login/Login";
import Signup from "./components/Signup/Signup";

/*
Sarthak Component
*/
import CreateBug from "./components/CreateBug/CreateBug";
import EditBug from './components/BugTracker/EditBug'
import BugTracker from './components/BugTracker/BugTracker'
import GoogleApiWrapper from './components/TestersLocation/TestersLocation'
import FileBrowserTester from './components/FileBrowser/MyFileBrowserTester'
import FileBrowserManager from './components/FileBrowser/MyFileBrowserManager'
import ViewAllUsers from './components/Admin/ViewAllUsers'
import ConsolidatedAdminReports from './components/DashboardReports/AdminReports/consolidateReportPage'
import ConsolidatedManagerReports from './components/DashboardReports/ManagerReports/allReportPageManager'
import ConsolidateTesterReports from './components/DashboardReports/TesterReports/allReportsPageTester'
import ConsolidatedTesterReports from "./components/DashboardReports/TesterReports/allReportsPageTester";
import TeamMembers from './components/ContactUs/ProjectTeam'


class Routes extends React.Component {
  render() {
    return (
      <Router>

        <Route exact path="/" component={Landing} />
        <Route exact path="/projectOpenings" component={ProjectOpenings} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/testerhome" component={TesterHome} />
        <Route exact path="/searchtester" component={SearchTester} />
        <Route exact path="/filtertester" component={FilterTester} />
        <Route exact path="/filterproject" component={FilterProject} />
        <Route exact path="/approvalList" component={ApprovalList} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        <Route exact path="/rejections" component={Rejections} />
        <Route
          exact
          path="/managersubscription"
          component={ManagerSubscription}
        />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/allProjects" component={AllProjects} />
        <Route exact path="/community" component={Community} />

        <Route exact path="/dashboard" component={Dashboard} />

        <Route exact path="/viewProject" component={ViewProject} />
        <Route path="/landing" component={Landing} />
        <Route path="/landingGooey" component={Landing1} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/chat" component={() => {
          if (localStorage.getItem('role') == 'Admin') {
            window.location.href = "http://localhost:8080/admin?username=" + localStorage.getItem('username') + "&" + "role=" + localStorage.getItem('role') + "";
            return null;
          } else {
            window.location.href = "http://localhost:8080?username=" + localStorage.getItem('username') + "&" + "role=" + localStorage.getItem('role') + "";
            return null;
          }
        }} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/showProfile" component={ShowProfile} />
        <Route exact path="/createBugReport" component={CreateBug} />
        <Route path='/editBug/:id' exact component={EditBug} />
        <Route path='/bugList' exact component={BugTracker} />
        <Route path='/testerLocation' exact component={GoogleApiWrapper} />
        <Route path='/testerFileBrowser' exact component={FileBrowserTester} />
        <Route path='/managerFileBrowser' exact component={FileBrowserManager} />
        <Route path='/admin/viewAllUsers' exact component={ViewAllUsers} />
        <Route path='/admin/reports' exact component={ConsolidatedAdminReports} />
        <Route path='/manager/reports' exact component={ConsolidatedManagerReports} />
        <Route path='/tester/reports' exact component={ConsolidatedTesterReports} />
        <Route path='/bill' exact component={ManagerBilling}/>
        <Route path = '/team' exact component = {TeamMembers} />
      </Router>
    );
  }
}
ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
