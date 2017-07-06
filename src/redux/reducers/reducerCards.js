import * as types from '../actions/actionsCards';

const initialState = {
  cards: [1],
  actualCards: [1],
  cardsReview: [],
};

export default function reducerCards(state = initialState, action) {
  switch (action.type) {
    case types.SET_CARDS: {
      return {
        ...state,
        cards: action.data,
      };
    }
    case types.SET_ACTUAL_CARDS: {
      return {
        ...state,
        actualCards: action.data,
      };
    }
    case types.SET_CARD: {
      return {
        ...state,
        card: action.data,
      };
    }
    case types.SET_CARDS_REVIEW: {
      return {
        ...state,
        cardsReview: action.data,
      };
    }
    default:
      return state;
  }
}
