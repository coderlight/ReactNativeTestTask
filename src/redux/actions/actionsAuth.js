import * as actionsRoute from './actionsRoute';
import * as actionsCards from './actionsCards';
import * as serviceREST from '../../services/serviceREST';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_AUTH_REQUEST_IN_PROGRESS = 'SET_AUTH_REQUEST_IN_PROGRESS';
export const SET_AUTH_RESULT = 'SET_AUTH_RESULT';

export function setUsername(data) {
  return {
    type: SET_USERNAME,
    data,
  };
}

export function setAuthRequestInProgress(data) {
  return {
    type: SET_AUTH_REQUEST_IN_PROGRESS,
    data,
  };
}

export function setAuthResult(data) {
  return {
    type: SET_AUTH_RESULT,
    data,
  };
}

export const logout = () => (dispatch) => {
  dispatch(setUsername(null));
  dispatch(setAuthResult(null));
  actionsRoute.resetToLogin();
};

export const login = data => (dispatch) => {
  dispatch(setAuthResult(null));
  const { username, password } = data;
  if (!username) {
    dispatch(setAuthResult('Please, input username'));
    return;
  }
  if (!password) {
    dispatch(setAuthResult('Please, input password'));
    return;
  }
  dispatch(setAuthRequestInProgress(true));
  serviceREST.postLogin({
    username,
    password,
  })
  .then((response) => {
    dispatch(setAuthRequestInProgress(false));
    if (response.data.success) {
      dispatch(setAuthResult('Success'));
      dispatch(setUsername(username));
      actionsRoute.replaceByCards();
      dispatch(actionsCards.getCardsAction());
    } else {
      dispatch(setAuthResult(response.data.message));
    }
  })
  .catch((error) => {
    console.warn('error', error);
  });
};

