import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    color: 'white',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
  button: {
    padding: 10,
    marginTop: 40,
    borderRadius: 5,
    width: 120,
  },
});

class InstructionTest extends React.Component {
  state = {
    startPressed: false,
  }

  showTestFailed() {
    if (this.props.attemptLeft <= 0) {
      Actions.push('NotEligible');
      return;
    }
    Alert.alert('You have failed the test', `You have ${this.props.attemptLeft} attempts left.\nPlease try again`);
    this.props.lowerTrialAttempt();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Please follow the instructions</Text>
        <View style={styles.instructionContainer}>
          <View style={{ flex: 0.1 }} />
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>
              Press the {this.state.startPressed ? 'STOP' : 'START'} button now
            </Text>
          </View>
          <View style={{ flex: 0.1 }} />
        </View>
        <Button
          style={[styles.button, {
            backgroundColor: '#00e500',
          }]}
          onPress={() => {
            if (this.state.startPressed) {
              this.showTestFailed();
            }
            this.setState({ startPressed: !this.state.startPressed });
          }}
          text="START TIMER"
        />
        <Button
          style={
            [styles.button, {
              backgroundColor: 'red',
            },
            ]}
          onPress={() => {
            if (!this.state.startPressed) {
              this.showTestFailed();
            } else {
              Actions.push(this.props.nextScene);
            }
          }}
          text="STOP TIMER"
        />
      </View>
    );
  }
}

export default InstructionTest;
