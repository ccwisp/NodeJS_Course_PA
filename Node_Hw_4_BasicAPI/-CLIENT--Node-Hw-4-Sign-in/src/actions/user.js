import axios from 'axios';

export function userLogin(log, pass) {
  return axios
    .post('http://localhost:3001/user/', {
      login: log,
      password: pass,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
export function userAdd(login, password) {
  return axios
    .post('http://localhost:3001/users/', {
      login,
      password,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
