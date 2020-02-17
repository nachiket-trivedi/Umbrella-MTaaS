import axios from 'axios';

export const postDiscussionApi = (discussion) => {
  console.log(discussion);
  return axios.post('/api/discussion/newDiscussion', discussion);
};
