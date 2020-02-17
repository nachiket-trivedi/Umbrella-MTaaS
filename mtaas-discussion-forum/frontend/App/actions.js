import _ from 'lodash';
import {
  START_FETCHING_FORUMS,
  STOP_FETCHING_FORUMS,
  FETCHING_FORUMS_SUCCESS,
  FETCHING_FORUMS_FAILURE,
  UPDATECURRENTFORUM,
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
} from './constants';
import {
  fetchForums,
  fetchUser,
  signOut,
} from './api';

/**
 * get all forum list
 * @return {action}
 */
export const getForums = (username, role) => {
  return (dispatch, getState) => {
    dispatch({ type: START_FETCHING_FORUMS });
    console.log("Inside getForums" + username);
    fetchForums(username, role).then(
      data => dispatch({ type: FETCHING_FORUMS_SUCCESS, payload: data.data }),
      error => dispatch({ type: FETCHING_FORUMS_FAILURE })
    );
  };
};

/**
 * update current forum when route change occurs
 * @param  {String} currentForum
 * @return {action}
 */
export const updateCurrentForum = (currentForum) => {
  console.log("Current Forum : " + currentForum);
  return {
    type: UPDATECURRENTFORUM,
    payload: currentForum,
  };
};

/**
 * get the current user from server
 * @return {action}
 */
export const getUser = (username, role) => {
  // console.log("getUser");
  // console.log({ username, role });
  return (dispatch, getState) => {
    dispatch({ type: START_FETCHING_USER });
    // dispatch({ type: FETCHING_USER_SUCCESS, payload: { "username": username, "role": role, "_id": username, "userId": username, "user": username, "user_id": username } });
    fetchUser(username, role).then(
      data => {
        console.log(data);
        if (!data) dispatch({ type: FETCHING_USER_FAILURE });
        else dispatch({ type: FETCHING_USER_SUCCESS, payload: data.data });
      },
      error => dispatch({ type: FETCHING_USER_FAILURE })
    );
  };
};


// app.get('/api/login', (req, res) => {
//   if (localStorage.getItem('userid') != null && localStorage.getItem('user_valid') === true) {
//     res.redirect('/');
//     // createForum({ forum_name: title, forum_slug: slug }).then(
//     //   (data) => { res.send(data); },
//     //   (error) => { res.send(error); }
//     // );
//   }
//   else res.send({ error: 'You are not admin buddy 😛' });
// });