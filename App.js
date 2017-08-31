import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReadyScreen from './src/ReadyScreen';
import { NativeRouter, Route, Link } from 'react-router-native';
import ReadyTransition from './src/ReadyTransition';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={ReadyScreen} />
          <Route path="/ReadyTransition" component={ReadyTransition} />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
});
