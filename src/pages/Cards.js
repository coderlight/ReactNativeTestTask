import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import Swiper from 'react-native-deck-swiper';

import * as actionsRoute from '../redux/actions/actionsRoute';
import * as actionsCards from '../redux/actions/actionsCards';
import Card from '../components/Card';
import { color } from '../constants/color';

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
});

class Cards extends React.Component {
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

  renderCard = card => {
    return (
      <View style={styles.card}>
        <Card card={card} onPress={() => { this.onCardPress(card); }} />
      </View>
    );
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
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

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack: isSwipingBack,
      },
      cb
    );
  };

  jumpTo = () => {
    this.swiper.jumpToCardIndex(2);
  };

  onPressMenu = () => {
    actionsRoute.toggleDrawer();
  };
  render() {
    const { actualCards, onSwipedCard } = this.props;
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
        <Swiper
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          onSwiped={this.onSwiped}
          cards={actualCards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={160}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          showSecondCard
          overlayLabels={{
            bottom: {
              title: 'BLEAH',
              swipeColor: '#9262C2',
              backgroundOpacity: '0.75',
              fontColor: '#FFF',
            },
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
            top: {
              title: 'SUPER LIKE',
              swipeColor: '#4EB8B7',
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
          onSwipedLeft={(cardIndex) => {
            onSwipedCard(cardIndex, true);
          }}
          onSwipedRight={(cardIndex) => {
            onSwipedCard(cardIndex, false);
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
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
