import * as actionsRoute from './actionsRoute';
import * as serviceREST from '../../services/serviceREST';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCT_REVIEWS = 'SET_PRODUCT_REVIEWS';

export function setProducts(data) {
  return {
    type: SET_PRODUCTS,
    data,
  };
}

export function setProduct(data) {
  return {
    type: SET_PRODUCT,
    data,
  };
}

export function setProductReviews(data) {
  return {
    type: SET_PRODUCT_REVIEWS,
    data,
  };
}

export const getProductsAction = () => (dispatch) => {
  serviceREST.getProducts()
  .then((response) => {
    dispatch(setProducts(response.data));
  })
  .catch((error) => {
    console.warn('serviceREST.getProducts error', error);
  });
};

export const getProductReviewsAction = id => (dispatch) => {
  serviceREST.getProductReviews(id)
  .then((response) => {
    dispatch(setProductReviews(response.data));
  })
  .catch((error) => {
    console.warn('serviceREST.getProductReviews error', error);
  });
};

export const onCardPressAction = data => (dispatch, getState) => {
  const { token } = getState().reducerAuth;
  if (token) {
    dispatch(setProduct(data));
    dispatch(getProductReviewsAction(data.id));
    actionsRoute.pushProductDetail();
  }
};

export const onSendReviewPressAction = data => (dispatch, getState) => {
  const { product } = getState().reducerProducts;
  const postData = {
    rate: data.rate,
    text: data.text,
  };
  serviceREST.postReview(postData, product.id)
  .then(() => {
    dispatch(getProductReviewsAction(product.id));
  })
  .catch(error => console.warn('serviceREST.postReview error', error));
};
