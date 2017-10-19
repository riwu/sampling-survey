import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  instructionContainer: {
    flexDirection: 'row',
    minHeight: 200,
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'lightgrey',
    flex: 0.8,
    justifyContent: 'center',
  },
  instructionTitle: {
    fontSize: 17,
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
        <View style={styles.instructionContainer}>
          <View style={{ flex: 0.1 }} />
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>
              {this.state.timerStarted
                ?
                'Your time estimation is ongoing.\nWhen you think the amount of time ' +
                'that has passed matches the time your screen was red, press the stop timer button.'
                :
                'Press the start timer button to start your time estimation'}
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <Button
          text="START TIMER"
          style={[styles.button, { backgroundColor: '#00e500' }]}
          disabled={this.state.timerStarted}
          onPress={() => this.setState({ timerStarted: true })}
        />
        <Button
          text="STOP TIMER"
          style={[styles.button, { backgroundColor: 'red' }]}
          disabled={!this.state.timerStarted}
          onPress={() => Actions.replace(this.props.nextScene)}
        />
      </View>
    );
  }
}

export default ReproduceDuration;
