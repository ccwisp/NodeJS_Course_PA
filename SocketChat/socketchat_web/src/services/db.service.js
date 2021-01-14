import axios from 'axios';

const API_URL = 'https://api-jslev.ondigitalocean.app/api/1/users/';

const insertUser = (user) => {
  return axios.post(API_URL + 'user', user).then((response) => {
    console.dir(response.data);
    return response.data;
  });
};
export default {
  insertUser,
};
