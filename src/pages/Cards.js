import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import Swiper from 'react-native-deck-swiper';

import * as actionsRoute from '../redux/actions/actionsRoute';
import * as actionsCards from '../redux/actions/actionsCards';
import Card from '../components/Card';
import { color } from '../constants/color';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width,
    backgroundColor: color.white,
    padding: 10,
  },
  usernameText: {
    fontSize: 18,
    color: color.gray,
  },
});

class Cards extends React.Component {
  static propTypes = {
    updateActualCards: React.PropTypes.func,
    actualCards: React.PropTypes.arrayOf(React.PropTypes.object),
    onSwipedCard: React.PropTypes.func,
    username: React.PropTypes.string,
  };

  static defaultProps = {
    updateActualCards: () => {},
    actualCards: [],
    onSwipedCard: () => {},
    username: '',
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

  componentWillUnmount() {
    const { updateActualCards } = this.props;
    updateActualCards();
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

  onPressMenu = () => {
    actionsRoute.toggleDrawer();
  };

  onSwipe = (cardIndex, value) => {
    const { onSwipedCard } = this.props;
    onSwipedCard(cardIndex, value);
    this.setState({ cardIndex: cardIndex + 1 });
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState({ isSwipingBack }, cb);
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  jumpTo = () => {
    this.swiper.jumpToCardIndex(2);
  };

  renderCard = card => (<View style={styles.card}>
    <Card card={card} />
  </View>);

  render() {
    const { actualCards, username } = this.props;
    const { cardIndex } = this.state;

    let title = 'That`s all';
    if (cardIndex < actualCards.length) {
      title = actualCards[cardIndex].title;
    }

    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={this.onPressMenu}
          centerElement="Reddit overview"
          style={{
            container: {
              backgroundColor: color.primary,
            },
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.usernameText}>You logged as {username}</Text>
          <Text>{title}</Text>
        </View>
        <Swiper
          marginTop={50}
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          onSwiped={this.onSwiped}
          cards={actualCards}
          cardIndex={cardIndex}
          cardVerticalMargin={160}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          showSecondCard
          overlayLabels={{
            left: {
              title: 'NOPE',
              swipeColor: '#FF6C6C',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
            right: {
              title: 'LIKE',
              swipeColor: '#4CCC93',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
          }}
          backgroundColor={color.transparent}
          animateOverlayLabelsOpacity
          animateCardOpacity
          secondCardZoom={0.1}
          disableTopSwipe
          disableBottomSwipe
          onSwipedLeft={(cardIndex_) => {
            this.onSwipe(cardIndex_, false);
          }}
          onSwipedRight={(cardIndex_) => {
            this.onSwipe(cardIndex_, true);
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.reducerAuth.username,
    cards: state.reducerCards.cards,
    actualCards: state.reducerCards.actualCards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSwipedCard: (cardIndex, value) => { dispatch(actionsCards.onSwipedCard(cardIndex, value)); },
    updateActualCards: () => { dispatch(actionsCards.updateActualCards()); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
