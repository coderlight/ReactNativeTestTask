import { create } from 'apisauce';

import { REQUEST_URL } from '../constants/requestUrl';

const api = create({
  baseURL: '',
  baseURL: REQUEST_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 3000,
});

export const setTokenToHeaders = (token) => {
  if (token) {
    api.setHeaders({
      Authorization: `Token ${token}`,
    });
  } else {
    api.setHeaders({
      Authorization: null,
    });
  }
};

export const requestErrorHandler = (response, reject) => {
  if (response.problem !== null) {
    const error = `${response.problem}`;
    reject(error);
  } else {
    reject('Sorry, something went wrong ...');
  }
};

export const getCards = () => new Promise((resolve, reject) => {
  api
  .get('/r/aww.json')
  .then((response) => {
    if (response.ok) {
      resolve(response);
    } else {
      requestErrorHandler(response, reject);
    }
  })
  .catch((error) => {
    console.warn('getCards error:', error);
    reject(error);
  });
});

export const postLogin = data => new Promise((resolve, reject) => {
  // api.post('login/', data)
  // .then((response) => {
  //   if (response.ok) {
  //     setTokenToHeaders(response.data.token);
  //     resolve(response);
  //   }
  //   resolve(response);
  // })
  // .catch((error) => {
  //   console.warn('postLogin error:', error);
  //   reject(error);
  // });


  setTimeout(() => {
    if (data.password === 'password') {
      const response = {
        data: {
          success: true,
        },
      };
      resolve(response);
    } else {
      const response = {
        data: {
          success: false,
          message: 'Login Failed',
        },
      };
      resolve(response);
    }
  }, 1000);
});
