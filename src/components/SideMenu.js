import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import { Toolbar, Button } from 'react-native-material-ui';

import * as actionsAuth from '../redux/actions/actionsAuth';
import * as actionsRoute from '../redux/actions/actionsRoute';
import { color } from '../constants/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: color.primaryLight,
    justifyContent: 'center',
  },
  sideMenuButtons: {
    backgroundColor: color.primary,
    justifyContent: 'flex-start',
    marginBottom: StyleSheet.hairlineWidth,
    borderRadius: 0,
    height: 50,
  },
  sideMenuButtonsText: {
    color: color.white,
    // fontFamily: 'Roboto-Regular',
  },
});

class SideMenu extends React.Component {
  onPressMenu = () => {
    this.closeDrawer();
  };

  onPressLogin = () => {
    this.closeDrawer();
    actionsRoute.resetToLogin();
  };

  onPressLogout = () => {
    actionsRoute.resetToLogin();
    this.props.logout();
  };

  onPressRegistration = () => {
    this.closeDrawer();
    actionsRoute.resetToRegistration();
  };

  onPressProducts = () => {
    this.closeDrawer();
    actionsRoute.resetToProducts();
  };

  closeDrawer = () => {
    TimerMixin.setTimeout(() => {
      Actions.refresh({ key: 'root', open: value => false });
    }, 0);
  };

  render() {
    let { username } = this.props;
    if (!username) {
      username = 'Please Log In';
      return (
        <View style={styles.container}>
          <Toolbar
            leftElement="person"
            rightElement="menu"
            onRightElementPress={this.onPressMenu}
            centerElement={username}
            style={{
              container: {
                backgroundColor: color.primary,
              },
            }}
          />
          <View style={styles.drawerContent}>
            <Button
              text="login"
              onPress={this.onPressLogin}
              style={{
                container: styles.sideMenuButtons,
                text: styles.sideMenuButtonsText,
              }}
            />
            <Button
              text="registration"
              onPress={this.onPressRegistration}
              style={{
                container: styles.sideMenuButtons,
                text: styles.sideMenuButtonsText,
              }}
            />
            <Button
              text="products"
              onPress={this.onPressProducts}
              style={{
                container: styles.sideMenuButtons,
                text: styles.sideMenuButtonsText,
              }}
            />
          </View>
          <View style={styles.drawerContent} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="person"
          rightElement="menu"
          onRightElementPress={this.onPressMenu}
          centerElement={username}
          style={{
            container: {
              backgroundColor: color.primary,
            },
          }}
        />
        <View style={styles.drawerContent}>
          <Button
            text="logout"
            onPress={this.onPressLogout}
            style={{
              container: styles.sideMenuButtons,
              text: styles.sideMenuButtonsText,
            }}
          />
          <Button
            text="products"
            onPress={this.onPressProducts}
            style={{
              container: styles.sideMenuButtons,
              text: styles.sideMenuButtonsText,
            }}
          />
        </View>
        <View style={styles.drawerContent} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.reducerAuth.username,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logout: () => { dispatch(actionsAuth.logout()); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);