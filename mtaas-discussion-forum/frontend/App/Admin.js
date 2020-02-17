import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getUser } from './actions';
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import AdminHeader from 'Containers/AdminHeader';
//import appLayout from 'SharedStyles/appLayout.css';
//import styles from './styles.css';
import queryString from 'query-string'
// import Navbar from '../Components/Navbar/Navbar';
// import { Redirect } from 'react-router'

// import {
//   deleteForum,
// } from '../Views/AdminDashboard/actions';

// let redirectVar = null;
class AdminContainer extends Component {
  componentDidMount() {
    // fetch the user

    const values = queryString.parse(this.props.location.search)
    const username = values.username;
    const role = values.role;
    // console.log("user " + user_id + "Role :" + role);
    // console.log("ComponentDidMount: Start");
    this.props.getUser(username, role);
    // console.log("ComponentDidMount: end");
  }
  // componentWillMount() {
  //   const values = queryString.parse(this.props.location.search)
  //   const forumid = values.forumid;
  //   if (forumid != null) {

  //     deleteForum(forumid);
  //     redirectVar = <Redirect to="http://localhost:3000/home" />
  //   }

  // }
  render() {
    // console.log("Render");

    const { user } = this.props;

    if (user.fetchingUser) {
      return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          Loading users profile...
        </div>
      );
    }
    console.log(user.role)
    if (user.role === 'Admin') {
      return (
        < div >
          {/* <Navbar /> */}
          <Helmet><title>MTaaS | Admin</title></Helmet>
          <AdminHeader />
          {this.props.children}
        </div >
      );
    }
    else {
      return (

        <div style={{ textAlign: 'center', marginTop: 20 }}>

          We are cordially sorry that you are not allowed to view admin panel!<br />
          Please go back to <Link to='/'>root</Link> page.
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        Something went wrong.<br />
        Please go back to <Link to='/'>root</Link> page.
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
    };
  },
  (dispatch) => {
    return {
      getUser: (username, role) => { dispatch(getUser(username, role)); },
    };
  }
)(AdminContainer);
