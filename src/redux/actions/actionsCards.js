import * as serviceREST from '../../services/serviceREST';

export const SET_CARDS = 'SET_CARDS';
export const SET_ACTUAL_CARDS = 'SET_ACTUAL_CARDS';
export const SET_CARD = 'SET_CARD';
export const SET_CARDS_REVIEW = 'SET_CARDS_REVIEW';
export const UPDATE_CARDS_REVIEW = 'UPDATE_CARDS_REVIEW';

export function setCards(data) {
  return {
    type: SET_CARDS,
    data,
  };
}

export function setActualCards(data) {
  return {
    type: SET_ACTUAL_CARDS,
    data,
  };
}

export function setCard(data) {
  return {
    type: SET_CARD,
    data,
  };
}

export function setCardsReview(data) {
  return {
    type: SET_CARDS_REVIEW,
    data,
  };
}

export function updateCardsReview(data) {
  return {
    type: UPDATE_CARDS_REVIEW,
    data,
  };
}

export const updateActualCards = () => (dispatch, getState) => {
  const cards = getState().reducerCards.cards;
  dispatch(setActualCards(cards));
};

export const getCardsAction = () => (dispatch) => {
  serviceREST.getCards()
  .then((response) => {
    const responseData = response.data;
    let cards = [];
    if (responseData.data) {
      if (Array.isArray(responseData.data.children)) {
        cards = responseData.data.children.map(item => ({
          thumbnail: item.data.thumbnail,
          thumbnail_height: item.data.thumbnail_height,
          thumbnail_width: item.data.thumbnail_width,
          title: item.data.title,
          url: item.data.url,
        }));
      }
    }
    dispatch(setCards(cards));
    dispatch(setActualCards(cards));
  })
  .catch((error) => {
    console.warn('serviceREST.getCards error', error);
  });
};

export const onSwipedCard = (cardIndex, value) => (dispatch, getState) => {
  const cards = getState().reducerCards.cards;
  const cardsReview = getState().reducerCards.cardsReview;
  const cardsUpdated = [...cards];
  const reviewedCard = cardsUpdated.shift();
  reviewedCard.approved = value;
  cardsReview.push(reviewedCard);
  dispatch(setCards(cardsUpdated));
  dispatch(setCardsReview(cardsReview));
};
