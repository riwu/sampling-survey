import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ready: {
    color: 'white',
    marginTop: 100,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    flexDirection: 'row',
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'lightgrey',
    flex: 0.8,
  },
  tellUs: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    padding: 10,
    marginTop: 40,
    borderRadius: 5,
    width: 120,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

class ReproduceDuration extends React.Component {
  state = {
    timerStarted: false,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ready}>HOW LONG WAS THE SCREEN RED FOR?</Text>
        <View style={styles.instructionContainer}>
          <View style={{ flex: 0.1 }} />
          <View style={styles.instructions}>
            <Text style={styles.tellUs}>Reproduce the duration</Text>
            <Text style={styles.text}>1. Press 'START' when you're ready</Text>
            <Text style={styles.text}>2. Press 'STOP' when you think you've reproduced the duration the screen was red for.</Text>
            <Text style={styles.text}>Remember:</Text>
            <Text style={styles.text}>- <Text style={{ textDecorationLine: 'underline' }}>Don't count</Text> how much time has passed</Text>
            <Text style={styles.text}>- We're interested in what it
                <Text style={{ fontStyle: 'italic' }}> feels like</Text> to you
              </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <TouchableHighlight
          style={[styles.button, {
            backgroundColor: '#00e500',
            opacity: this.state.timerStarted ? 0.4 : 1,
          }]}
          onPress={() => this.setState({ timerStarted: true })}
        >
          <Text style={styles.buttonText}>START TIMER</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={
          [styles.button, {
            backgroundColor: 'red',
            opacity: this.state.timerStarted ? 1 : 0.4,
          },
          ]}
          onPress={() => Actions.push('Question 2')}
        >
          <Text style={styles.buttonText}>STOP TIMER</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default ReproduceDuration;
