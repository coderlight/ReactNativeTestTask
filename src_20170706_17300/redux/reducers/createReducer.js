import { combineReducers } from 'redux';
import reducerAuth from './reducerAuth';

const reducers = {
  reducerAuth,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
