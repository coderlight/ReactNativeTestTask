import { AsyncStorage } from 'react-native';

const setItem = async (key, val, callback) => {
  try {
    let value = '';
    value = JSON.stringify(val);
    await AsyncStorage.setItem(key, value);
    if (callback) {
      callback();
    }
  } catch (error) {
    console.warn('serviceStorage.setItem error:', error);
    if (callback) {
      callback(error);
    }
  }
};

const setStringItem = async (key, val, callback) => {
  try {
    await AsyncStorage.setItem(key, val);
    if (callback) {
      callback();
    }
  } catch (error) {
    console.warn('serviceStorage.setItem error:', error);
    if (callback) {
      callback(error);
    }
  }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.warn('serviceStorage.getItem error:', error);
  }
};


const getStringItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.warn('serviceStorage.getStringItem error:', error);
  }
};

const getKeys = () => new Promise((resolve, reject) => {
  AsyncStorage.getAllKeys()
  .then((keys) => {
    resolve(keys);
  })
  .catch((error) => {
    reject(error);
  });
});

const multiGet = (keys = []) => new Promise((resolve, reject) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    resolve(stores);
  })
  .catch((error) => {
    reject(error);
  });
});

const multiRemove = keys => new Promise((resolve, reject) => {
  if (keys && keys.length > 0) {
    AsyncStorage.multiRemove(keys, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  } else {
    resolve();
  }
});

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('serviceStorage.removeItem error:', error);
  }
};

const clear = async () => {
  AsyncStorage.clear(() => { console.warn('AsyncStorage cleared'); });
};

export const serviceStorage = {
  setItem,
  getItem,
  setStringItem,
  getStringItem,
  getKeys,
  multiGet,
  removeItem,
  multiRemove,
  clear,
};
