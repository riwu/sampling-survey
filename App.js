import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { NativeRouter, Route, Switch } from 'react-router-native';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducer from './src/reducer';
import Routes from './src/Routes';

// const history = createHistory();
// const middleware = routerMiddleware(history);

const store = createStore(combineReducers({
  ...reducer,
  router: routerReducer,
}), undefined); // applyMiddleware(middleware)
// persistStore(store, { storage: AsyncStorage });

const App = () => (
  <Provider store={store}>
    <NativeRouter>
      <Routes />
    </NativeRouter>
  </Provider>
);

export default App;
