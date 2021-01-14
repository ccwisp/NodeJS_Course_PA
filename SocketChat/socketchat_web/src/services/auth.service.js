import axios from 'axios';

const API_URL = 'https://api-jslev.ondigitalocean.app/api/1/auth/';

const register = (login, email, password) => {
  return axios.post(API_URL + 'register', {
    login,
    email,
    password,
  });
};

const login = (login, password) => {
  return axios
    .post(API_URL + 'login', {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
