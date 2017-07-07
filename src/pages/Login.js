import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

import * as actionsAuth from '../redux/actions/actionsAuth';
import { color } from '../constants/color';
import Spinner from '../components/Spinner';

const { width, height } = Dimensions.get('window');

const buttonHeight = 45;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: color.gray,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    margin: 10,
    padding: 5,
    borderRadius: 2,
    backgroundColor: color.grayLight,
  },
  iconContainer: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: color.white,
  },
  txtphoneContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  btnContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    color: color.white,
  },
  btnLoginContainer: {
    width: width - 40,
    height: buttonHeight,
    backgroundColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: color.white,
  },
  shadow: {
    elevation: 5,
    shadowColor: color.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 1,
    },
  },
  toolbarContainer: {
    backgroundColor: color.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  authResultText: {
    fontSize: 18,
    color: color.white,
  },
  spinnerView: {
    height: buttonHeight,
    width: buttonHeight,
  },
});

const { State: TextInputState } = TextInput;

class Login extends React.Component {
  static propTypes = {
    login: React.PropTypes.func,
    authResult: React.PropTypes.string,
    authRequestInProgress: React.PropTypes.bool,
  };

  static defaultProps = {
    login: () => {},
    authResult: '',
    authRequestInProgress: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onPressMenu = () => {
    Actions.refresh({ key: 'root', open: value => !value });
  };

  onLogin = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login({ username, password });
  };

  dismissKeyboard = () => {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField());
  }

  render() {
    const { username, password } = this.state;
    const { authResult, authRequestInProgress } = this.props;
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.onPressMenu}
          centerElement="Login"
          style={{
            container: styles.toolbarContainer,
          }}
        />
        <View style={styles.contentContainer}>
          <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <View style={styles.contentContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.authResultText} numberOfLines={2}>{authResult}</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputTextContainer}>
                  <View style={styles.iconContainer}>
                    <SimpleLineIcons name={'user'} size={18} color={color.white} />
                  </View>
                  <View style={styles.txtphoneContainer}>
                    <TextInput
                      underlineColorAndroid={color.transparent}
                      style={styles.textInput}
                      placeholder="Username"
                      keyboardType="email-address"
                      placeholderTextColor={color.white}
                      onChangeText={text => this.setState({ username: text })}
                      autoCapitalize="none"
                      value={username}
                    />
                  </View>
                </View>
                <View style={styles.inputTextContainer}>
                  <View style={styles.iconContainer}>
                    <SimpleLineIcons name={'lock'} size={18} color={color.white} />
                  </View>
                  <View style={styles.txtphoneContainer}>
                    <TextInput
                      underlineColorAndroid={color.transparent}
                      style={styles.textInput}
                      placeholder="Password"
                      secureTextEntry
                      placeholderTextColor={color.white}
                      onChangeText={text => this.setState({ password: text })}
                      autoCapitalize="none"
                      value={password}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.btnContainer]}>
                <TouchableOpacity
                  style={[styles.btnLoginContainer, styles.shadow]}
                  onPress={this.onLogin}
                >
                  <View style={styles.spinnerView} />
                  <Text style={[styles.btnText]}>
                    LOGIN
                  </Text>
                  <View style={styles.spinnerView}>
                    {authRequestInProgress ? <Spinner /> : null }
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    authResult: state.reducerAuth.authResult,
    authRequestInProgress: state.reducerAuth.authRequestInProgress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (data) => { dispatch(actionsAuth.login(data)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
