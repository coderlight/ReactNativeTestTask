import * as types from '../actions/actionsProducts';

const initialState = {
  products: [
    {
      id: 1,
      title: 'product1',
      img: 'img1.png',
      text: 'lorem ipsum 1',
    },
    {
      id: 7,
      title: 'product7',
      img: 'img7.png',
      text: 'lorem ipsum 7',
    },
    {
      id: 8,
      title: 'product8',
      img: 'img8.png',
      text: 'lorem ipsum 8',
    },
  ],
  product: {
    id: null,
    title: '',
    img: '',
    text: '',
  },
  productReviews: null,
};

export default function reducerProducts(state = initialState, action) {
  switch (action.type) {
    case types.SET_PRODUCTS: {
      return {
        ...state,
        products: action.data,
      };
    }
    case types.SET_PRODUCT: {
      return {
        ...state,
        product: action.data,
      };
    }
    case types.SET_PRODUCT_REVIEWS: {
      return {
        ...state,
        productReviews: action.data,
      };
    }
    default:
      return state;
  }
}
