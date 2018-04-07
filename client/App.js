import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import codePush from 'react-native-code-push';
import Routes from './src/Routes';
import store, { persistor } from './src/store';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Module RCTImageLoader requires',
  'Class RCTCxxModule was not exported',
]);
