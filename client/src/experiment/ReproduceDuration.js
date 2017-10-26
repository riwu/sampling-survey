import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';
import { getNextScene } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    color: 'white',
    marginTop: 50,
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
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'lightgrey',
    flex: 0.8,
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
    startTimer: undefined,
  }
  componentDidMount() {
    this.timeBetweenMountAndStart = Date.now();
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>HOW LONG WAS THE SCREEN RED FOR?</Text>
          <View style={styles.instructionContainer}>
            <View style={{ flex: 0.1 }} />
            <View style={styles.instructions}>
              <Text style={styles.instructionTitle}>Reproduce the duration</Text>
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
          <Button
            text="START TIMER"
            style={[styles.button, { backgroundColor: '#00e500' }]}
            disabled={!!this.state.startTimer}
            onPress={() => {
              const currentTime = Date.now();
              this.setState({ startTimer: currentTime });
              this.timeBetweenMountAndStart = currentTime - this.timeBetweenMountAndStart;
            }}
          />
          <Button
            text="STOP TIMER"
            style={[styles.button, { backgroundColor: 'red' }]}
            disabled={!this.state.startTimer}
            onPress={() => {
              const duration = Date.now() - this.state.startTimer;
              this.props.updateDuration({
                recordedDuration: duration,
                timeBetweenMountAndStart: this.timeBetweenMountAndStart,
              });
              if (this.props.actualDuration && (duration < 500 ||
                Math.abs(duration - this.props.actualDuration) > 3000)) {
                Actions.replace('FailedTrial', { roundNum: this.props.roundNum });
                return;
              }
              Actions.replace(getNextScene(this.props.nextScene, this.props.startTime));
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ReproduceDuration;
