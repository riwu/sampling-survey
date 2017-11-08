import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Routes from './src/Routes';
import store, { persistor } from './src/store';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} >
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;
