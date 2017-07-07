import React from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

const ref = 'navigation';

export default class NavigationDrawer extends React.Component {
  static propTypes = {
    navigationState: React.PropTypes.object,
    onNavigate: React.PropTypes.func,
  };

  static defaultProps = {
    navigationState: {},
    onNavigate: () => {},
  };

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref={ref}
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type={'overlay'}
        content={<SideMenu />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}
