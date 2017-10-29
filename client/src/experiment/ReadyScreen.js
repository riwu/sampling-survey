import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';
import { getNextScene } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  subContainer: {
    alignItems: 'center',
  },
  instructionContainer: {
    flexDirection: 'row',
  },
  header: {
    color: 'white',
    marginTop: 50,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeader: {
    color: 'white',
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: 'lightgrey',
    flex: 0.8,
  },
  instructionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 6,
  },
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: 40,
  },
  turned: {
    backgroundColor: 'red',
  },
});

function getRandomInt(min, max) { // The maximum is exclusive and the minimum is inclusive
  const minCeil = Math.ceil(min);
  const maxCeil = Math.floor(max);
  return Math.floor(Math.random() * (maxCeil - minCeil)) + minCeil;
}

class ReadyScreen extends React.Component {
  state = {
    startedTransition: false,
    turned: false,
  }

  startTransition() {
    const blackDuration = getRandomInt(1, 4) * 1000;
    let rand;
    const filter = (used, duration) => used.every(({ redDuration }) => redDuration !== duration);
    console.log('ready', this.props.trialRoundNum, this.props.answers);
    if (this.props.trialRoundNum === undefined) {
      rand = [2000, 4000, 6000, 8000, 10000].filter(duration =>
        filter(Object.values(this.props.answers || {}), duration));
    } else {
      const last = this.props.answers[this.props.answers.length - 1] || {};
      if (this.props.trialRoundNum === last.round) {
        console.log('using last');
        rand = [last.redDuration];
      } else {
        rand = [2000, 6000, 10000].filter(duration => filter(this.props.answers, duration));
      }
    }
    const redDuration = rand[getRandomInt(0, rand.length)];
    console.log('red', redDuration, rand);
    this.props.updateDuration({
      blackDuration,
      redDuration,
    });
    this.setState({ startedTransition: true });
    setTimeout(() => {
      this.setState({ turned: true });
      setTimeout(() => {
        Actions.replace(this.props.nextScene);
      }, redDuration);
    }, blackDuration);
  }

  render() {
    const { nextScene, roundText, startTime } = this.props;
    return (
      <ScrollView style={[styles.container, this.state.turned && styles.turned]}>
        <View style={styles.subContainer}>
          <Text style={[styles.header, this.state.startedTransition && { opacity: 0 }]}>
            READY FOR YOUR TASK?
          </Text>
          <Text style={[styles.subHeader, this.state.startedTransition && { opacity: 0 }]}>
            ROUND {roundText}
          </Text>
          <Text style={styles.plus} >+</Text>
          {!this.state.startedTransition &&
            <View style={{ alignItems: 'center' }}>
              <View style={styles.instructionContainer}>
                <View style={{ flex: 0.1 }} />

                <View style={styles.instructions}>
                  <Text style={styles.instructionTitle}>
                    Tell us how long the screen turns red for
                  </Text>
                  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>1. </Text>
                    <Text>Click {'\'ready\''} and the screen will turn red.</Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text>2. </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                      <Text>When the screen is red:</Text>
                      <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 3 }}>
                        <Text>- </Text>
                        <Text>Focus on the cross above (+)</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text>- </Text>
                        <Text><Text style={{ textDecorationLine: 'underline' }}>Don{'\''}t count</Text> how much time has passed</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginBottom: 2 }} >
                        <Text>- </Text>
                        <Text>We{'\''}re interested in what it <Text style={{ fontStyle: 'italic' }}>feels like</Text> to you</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flex: 0.1 }} />
              </View>

              <Button
                text="Ready"
                onPress={() => {
                  const next = getNextScene(nextScene, startTime);
                  if (next === 'SESSION TIMED OUT') {
                    Actions.replace(next);
                  } else {
                    this.startTransition();
                  }
                }}
              />
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

export default ReadyScreen;
