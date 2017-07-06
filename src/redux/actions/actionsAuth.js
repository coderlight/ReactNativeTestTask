import * as actionsRoute from './actionsRoute';
import * as actionsCards from './actionsCards';
import * as serviceREST from '../../services/serviceREST';
import { serviceStorage } from '../../services/serviceStorage';
import { storageKeys } from '../../constants/storageKeys';

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
  serviceREST.setTokenToHeaders(null);
  serviceStorage.removeItem(storageKeys.username);
  actionsRoute.resetToLogin();
};

export const loadDataFromStorage = () => (dispatch) => {
  serviceStorage.getStringItem(storageKeys.username)
  .then((value) => {
    if (value) {
      dispatch(setUsername(value));
      actionsRoute.replaceByCards();
      dispatch(actionsCards.getCardsAction());
    }
  })
  .catch(error => console.warn('loadDataFromStorage username serviceStorage.getStringItem error', error));
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
      serviceStorage.setStringItem(storageKeys.username, username);
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

