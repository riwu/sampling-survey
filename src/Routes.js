import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import ReadyScreen from './ReadyScreen';
import ReadyTransition from './ReadyTransition';
import ReproduceDuration from './ReproduceDuration';
import Question2 from './Question2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
});

const App = () => (
  <View style={styles.container}>
    <Switch>
      <Route exact path="/ReadyScreen" component={ReadyScreen} />
      <Route path="/ReadyTransition" component={ReadyTransition} />
      <Route path="/ReproduceDuration" component={ReproduceDuration} />
      <Route path="/" component={Question2} />
    </Switch>
  </View>
);

export default App;
