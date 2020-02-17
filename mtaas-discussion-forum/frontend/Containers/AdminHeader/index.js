import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import appLayout from 'SharedStyles/appLayout';
import styles from './styles';

// components for AdminHeader
import UserMenu from 'Components/Header/UserMenu';
import Logo from 'Components/Header/Logo';
import NavigationBar from 'Components/Header/NavigationBar';
import AdminNavigationBar from 'Components/Header/AdminNavigationBar';
import PlaceholderImage from 'SharedStyles/placeholder.jpg';

class AdminHeader extends Component {
  renderNavLinks() {
    return [
      { name: 'Dashboard', link: `/admin?username=${this.props.user.username}&role=${this.props.user.role}` },
    ];
  }
  renderDownNavLinks() {
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
      authenticated,
      name,
      username,
      avatarUrl,
    } = this.props.user;

    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo />
          Welcome Admin
          {/* <UserMenu
            signedIn={authenticated}
            userName={name || username}
            gitHandler={username}
            avatar={avatarUrl}
          /> */}
          <a className="fa fa-fw fa-home" href="http://localhost:3000/home" ></a>
        </div>
        <NavigationBar
          navigationLinks={this.renderNavLinks()}
        />
        <AdminNavigationBar
          navigationLinks={this.renderDownNavLinks()}
        />

      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      forums: state.app.forums,
      adminInfo: state.adminInfo,
    };
  }
)(AdminHeader);
