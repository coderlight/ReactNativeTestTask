import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../constants/color';

const iconApproved = (<Icon name="thumb-up" size={30} color={color.primary} />);
const iconDisapproved = (<Icon name="thumb-down" size={30} color={color.primary} />);

const { width } = Dimensions.get('window');

const imageSize = 70;

const styles = StyleSheet.create({
  item: {
    width,
    height: imageSize,
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  image: {
    width: imageSize,
    height: imageSize,
  },
  title: {
    width: width - (imageSize * 2),
    paddingLeft: 10,
  },
  approved: {
    width: imageSize,
    height: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class ListItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      thumbnail: React.PropTypes.string,
      title: React.PropTypes.string,
      approved: React.PropTypes.bool,
    }),
  };

  static defaultProps = {
    item: {
      thumbnail: '',
      title: '',
      approved: null,
    },
  };

  render() {
    const {
      thumbnail,
      title,
      approved,
    } = this.props.item;

    return (
      <View style={styles.item}>
        <Image
          resizeMode={'cover'}
          source={{ uri: thumbnail, static: true }}
          style={styles.image}
        />
        <Text numberOfLines={3} style={styles.title}>{title}</Text>
        <View style={styles.approved}>
          {
            approved ? iconApproved : iconDisapproved
          }
        </View>
      </View>
    );
  }
}
