import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import { color } from '../constants/color';

import RouterComponent from '../route/RouterComponent';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primaryLight,
  },
});

export default class Root extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            animated
            hidden
          />
          {
            <RouterComponent />
          }
        </View>
      </ThemeProvider>
    );
  }
}

