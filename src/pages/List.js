import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';

import * as actionsRoute from '../redux/actions/actionsRoute';
import ListItem from '../components/ListItem';
import { color } from '../constants/color';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  separator: {
    width,
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.transparent,
  },
});

class List extends React.Component {
  static propTypes = {
    cardsReview: React.PropTypes.arrayOf(React.PropTypes.object),
  };

  static defaultProps = {
    cardsReview: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
    };
  }

  onPressMenu = () => {
    actionsRoute.toggleDrawer();
  };

  render() {
    const { cardsReview } = this.props;
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.onPressMenu}
          centerElement="Users approve/disapprove list"
          style={{
            container: {
              backgroundColor: color.primary,
            },
          }}
        />
        <ListView
          style={styles.container}
          dataSource={ds.cloneWithRows(cardsReview)}
          enableEmptySections
          onRefresh={this.onRefresh}
          renderRow={rowData => (<ListItem item={rowData} />)}
          renderSeparator={() => (<View style={styles.separator} />)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cardsReview: state.reducerCards.cardsReview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
