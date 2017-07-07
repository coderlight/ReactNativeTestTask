import { Actions } from 'react-native-router-flux';

export const resetToCards = () => {
  Actions.Cards({ type: 'reset' });
};

export const replaceByCards = () => {
  Actions.Cards({ type: 'replace' });
};

export const resetToList = () => {
  Actions.List({ type: 'reset' });
};

export const replaceByList = () => {
  Actions.List({ type: 'replace' });
};

export const resetToLogin = () => {
  Actions.Login({ type: 'reset' });
};

export const pop = () => {
  Actions.pop();
};

export const toggleDrawer = () => {
  Actions.refresh({ key: 'root', open: value => !value });
};
