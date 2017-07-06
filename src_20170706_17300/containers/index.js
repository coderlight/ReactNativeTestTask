import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/reducers/createStore';
import Root from './root';

// console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
