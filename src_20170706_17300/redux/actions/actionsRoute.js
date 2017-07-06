import { Actions } from 'react-native-router-flux';

export const resetToProducts = () => {
  Actions.Products({ type: 'reset' });
};

export const pushProducts = () => {
  Actions.Products({ type: 'replace' });
};

export const pushProductDetail = () => {
  Actions.ProductDetails();
};

export const resetToLogin = () => {
  Actions.Login({ type: 'reset' });
};

export const resetToRegistration = () => {
  Actions.Registration({ type: 'reset' });
};

export const pop = () => {
  Actions.pop();
};

export const toggleDrawer = () => {
  Actions.refresh({ key: 'root', open: value => !value });
};
