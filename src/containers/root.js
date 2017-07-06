import React from 'react';
import { connect } from 'react-redux';
import * as actionsAuth from '../redux/actions/actionsAuth';

import Root from '../pages/Root';

function mapStateToProps(state) {
  return {
    username: state.reducerAuth.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadDataFromStorage: () => { dispatch(actionsAuth.loadDataFromStorage()); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
