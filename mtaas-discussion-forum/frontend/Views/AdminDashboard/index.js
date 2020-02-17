import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import ForumFeed from '../ForumFeed';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import AdminNavigationBar from '../../Components/Header/AdminNavigationBar';

import {
  getAdminDashboardInfo,
  getForums,
  createForum,
  deleteForum,
} from './actions';
import Counts from 'Components/Dashboard/Counts';
import ForumBox from 'Components/Dashboard/ForumBox';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dashboardData: {}
    }
  }

  componentDidMount() {
    this.props.getAdminDashboardInfo();
  }
  // componentWillMount() {
  //   // get information needed for dashboard


  //   let labels = ['Users', 'Discussion', 'Opinions', 'Projects'];
  //   let count = [this.props.adminInfo.info.userCount, this.props.adminInfo.info.discussionCount, this.props.adminInfo.info.opinionCount, this.props.adminInfo.info.forumCount];
  //   console.log(count)

  //   this.setState({
  //     dashboardData: {
  //       labels: labels,
  //       datasets: [{
  //         data: count,
  //         backgroundColor: bc,
  //         hoverBackgroundColor: bc
  //       }]
  //     }
  //   });



  // }
  renderNavLinks() {
    const { forums } = this.props.adminInfo.info;


    if (forums) {
      return forums.map((forum) => {
        return {
          id: forum._id,
          name: forum.forum_name,
          link: `/${forum.forum_slug}?username=${this.props.user.username}&role=${this.props.user.role}`,
        };
      });
    }

    return null;
  }
  render() {
    const {
      discussionCount,
      opinionCount,
      forumCount,
      userCount,
      forums,
    } = this.props.adminInfo.info;
    let labels = ['Users', 'Discussion', 'Opinions', 'Projects'];
    let count = [this.props.adminInfo.info.userCount, this.props.adminInfo.info.discussionCount, this.props.adminInfo.info.opinionCount, this.props.adminInfo.info.forumCount];
    let bc = [];
    labels.forEach((each) => {
      let c = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
      bc.push(c)
    })
    const dashboardData = {
      labels: labels,
      datasets: [{
        data: count,
        backgroundColor: bc,
        hoverBackgroundColor: bc
      }]
    }
    const {
      loadingInfo,
      creatingForum,
      creatingForumError,
      deletingForum,
      deletingForumError,
    } = this.props;

    const forumsArray = forums.map((forum) => {
      return { id: forum._id, name: forum.forum_name, slug: forum.forum_slug };
    });

    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        {loadingInfo && <div className={classnames(styles.loadingMsg)}>
          Loading dashboard info...
        </div>}

        <div className={styles.countsContainer}>
          {/* <Counts label={'Users'} count={userCount} />
          <Counts label={'Discussions'} count={discussionCount} />
          <Counts label={'Opinions'} count={opinionCount} />
          <Counts label={'Projects'} count={forumCount} /> */}
          <Doughnut data={dashboardData}
            width={100}
            height={40}
            options={{ maintainAspectRatio: true }} />
        </div>

        {/* <AdminNavigationBar
          navigationLinks={this.renderNavLinks()}
        /> */}
        {/* <ForumFeed /> */}
        {/* <ForumBox
          forums={forumsArray}
          deletingForum={deletingForum}
          deleteAction={(forumId) => { this.props.deleteForum(forumId); }}
          creatingForum={creatingForum}
          createAction={(forumObj) => { this.props.createForum(forumObj); }}
        /> */}

        {creatingForumError && <div className={styles.errorMsg}>{creatingForumError}</div>}
        {deletingForumError && <div className={styles.errorMsg}>{deletingForumError}</div>}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      adminInfo: state.adminInfo,
      loadingInfo: state.adminInfo.loadingInfo,
      creatingForum: state.adminInfo.creatingForum,
      creatingForumError: state.adminInfo.creatingForumError,
      deletingForum: state.adminInfo.deletingForum,
      deletingForumError: state.adminInfo.deletingForumError,
      user: state.user,

    };
  },
  (dispatch) => {
    return {
      getAdminDashboardInfo: () => { dispatch(getAdminDashboardInfo()); },
      getForums: () => { dispatch(getForums()); },
      deleteForum: (forumId) => { dispatch(deleteForum(forumId)); },
      createForum: (forumObj) => { dispatch(createForum(forumObj)); },
    };
  }
)(Dashboard);
