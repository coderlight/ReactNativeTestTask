import * as types from '../actions/actionsAuth';

const initialState = {
  username: null,
  authRequestInProgress: false,
  authResult: null,
};

export default function reducerAuth(state = initialState, action) {
  switch (action.type) {
    case types.SET_USERNAME: {
      return {
        ...state,
        username: action.data,
      };
    }
    case types.SET_AUTH_REQUEST_IN_PROGRESS: {
      return {
        ...state,
        authRequestInProgress: action.data,
      };
    }
    case types.SET_AUTH_RESULT: {
      return {
        ...state,
        authResult: action.data,
      };
    }
    default:
      return state;
  }
}
