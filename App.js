import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import logger from 'redux-logger';

import reducer from './src/reducers/reducer';
import Routes from './src/Routes';

const store = createStore(reducer, undefined, applyMiddleware(logger)); // autoRehydrate()
persistStore(store, { storage: AsyncStorage });

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
