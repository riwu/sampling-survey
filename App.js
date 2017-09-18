import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './src/reducer';
import Routes from './src/Routes';

const store = createStore(reducer, undefined);
// persistStore(store, { storage: AsyncStorage });

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
