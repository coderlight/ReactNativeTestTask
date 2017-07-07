import { create } from 'apisauce';

import { requestUrl } from '../constants/requestUrl';

const api = create({
  baseURL: requestUrl.url,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 5000,
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
  .get(requestUrl.getEndpoint)
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

export const postLogin = data => new Promise((resolve) => {
  // fake api call
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
