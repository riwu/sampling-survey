import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Switch } from 'react-router-native';
import ReadyScreen from './src/ReadyScreen';
import ReadyTransition from './src/ReadyTransition';
import ReproduceDuration from './src/ReproduceDuration';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route path="/" component={ReproduceDuration} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}
//            <Route exact path="/" component={ReadyScreen} />
//            <Route path="/ReadyTransition" component={ReadyTransition} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
});
