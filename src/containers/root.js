import { connect } from 'react-redux';

import Root from '../pages/Root';

function mapStateToProps(state) {
  return {
    username: state.reducerAuth.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
