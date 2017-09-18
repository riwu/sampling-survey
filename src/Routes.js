import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
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
  <NativeRouter>
    <View style={styles.container}>
      <Switch>
        <Route exact path="/" component={ReadyScreen} />
        <Route path="/ReadyTransition" component={ReadyTransition} />
        <Route path="/ReproduceDuration" component={ReproduceDuration} />
        <Route path="/Question2" component={Question2} />
      </Switch>
    </View>
  </NativeRouter>
);

export default App;
