import { create } from 'apisauce';

const REQUEST_URL = 'http://smktesting.herokuapp.com/api/';

const api = create({
  baseURL: REQUEST_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
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

export const getProducts = () => new Promise((resolve, reject) => {
  api
  .get('products/')
  .then((response) => {
    if (response.ok) {
      resolve(response);
    } else {
      requestErrorHandler(response, reject);
    }
  })
  .catch((error) => {
    console.warn('getProducts error:', error);
    reject(error);
  });
});

export const getProductReviews = id => new Promise((resolve, reject) => {
  api
  .get(`reviews/${id}`)
  .then((response) => {
    if (response.ok) {
      resolve(response);
    } else {
      requestErrorHandler(response, reject);
    }
  })
  .catch((error) => {
    console.warn('getProductReviews error:', error);
    reject(error);
  });
});

export const postReview = (data, id) => new Promise((resolve, reject) => {
  api.post(`reviews/${id}`, data)
  .then((response) => {
    if (response.ok) {
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postReview error:', error);
    reject(error);
  });
});

export const postRegister = data => new Promise((resolve, reject) => {
  api.post('register/', data)
  .then((response) => {
    if (response.ok) {
      setTokenToHeaders(response.data.token);
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postRegistration error:', error);
    reject(error);
  });
});

export const postLogin = data => new Promise((resolve, reject) => {
  api.post('login/', data)
  .then((response) => {
    if (response.ok) {
      setTokenToHeaders(response.data.token);
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postLogin error:', error);
    reject(error);
  });
});
