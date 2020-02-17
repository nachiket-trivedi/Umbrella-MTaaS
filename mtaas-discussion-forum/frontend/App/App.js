import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import queryString from 'query-string'
import AdminHeader from '../Containers/AdminHeader';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { getForums, updateCurrentForum, getUser } from './actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { role: "" };
  }
  componentDidMount() {
    const {
      params,
      updateCurrentForum,
      getForums,
      getUser,
    } = this.props;
    const values = queryString.parse(this.props.location.search)
    const username = values.username;
    const role = values.role;

    // get all forum list
    console.log("App.js : " + username);
    getUser(username, role);
    getForums(username, role);
    this.setState({ role });

    // check for authenticated user


    // set current forum based on route
    const currentForum = params.forum || '';
    updateCurrentForum(currentForum);
  }

  componentDidUpdate() {
    const {
      forums,
      params,
      currentForum,
      updateCurrentForum,
    } = this.props;

    let newCurrentForum = '';
    if (params.forum) newCurrentForum = params.forum;
    else if (forums) newCurrentForum = forums[0].forum_slug;

    // update current forum if necessery
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  }

  render() {
    const { forums } = this.props;

    // render only if we get the forum lists
    if (forums) {
      return (
        <div>
          <Helmet><title>MTaaS</title></Helmet>

          {/* <div className={styles.gitForkTag}>
            <a className={styles.gitLink} href="https://github.com/shoumma/ReForum" target="_blank">Fork on Github</a>
          </div> */}
          {this.state.role == 'Admin' ? <AdminHeader /> : <Header />}
          {/* <Header /> */}
          {this.props.children}
          <Footer />
        </div>
      );
    }

    return (
      <div className={styles.loadingWrapper}>Loading...</div>
    );
  }
}

export default connect(
  (state) => {
    return {
      forums: state.app.forums,
      currentForum: state.app.currentForum,
    };
  },
  (dispatch) => {
    return {
      getForums: (username, role) => { dispatch(getForums(username, role)); },
      updateCurrentForum: (currentForum) => { dispatch(updateCurrentForum(currentForum)); },
      getUser: (username, role) => { dispatch(getUser(username, role)); },
    };
  }
)(AppContainer);
