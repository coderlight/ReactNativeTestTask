import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';

import * as Material from 'react-native-material-ui';

import { color } from '../constants/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: width - 80,
    height: width - 40,
  },
});

export default class Card extends React.Component {
  render() {
    const {
      thumbnail,
      title,
    } = this.props.card;

    return (
      <Material.Card>
        <View style={styles.card}>
          <Image
            resizeMode={'contain'}
            source={{ uri: thumbnail, static: true }}
            style={styles.image}
          />
        </View>
      </Material.Card>
    );
  }
}

Card.defaultProps = {
  thumbnail: '',
  title: '',
};

Card.propTypes = {
  thumbnail: React.PropTypes.string,
  title: React.PropTypes.string,
};
