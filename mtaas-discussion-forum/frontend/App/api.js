import axios from 'axios';

export const fetchForums = (username, role) => {
  // return axios.get('/api/forum');
  // console.log("fetchForums: " + username + role);
  return axios.post('/api/forum', { username, role });

};

export const fetchUser = (username) => {
  return axios.get('/api/user/profile/' + username);
  // console.log("Inside fetchuser");
  // return localStorage.getItem('userid');
};
