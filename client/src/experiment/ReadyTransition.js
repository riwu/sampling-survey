import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  turned: {
    backgroundColor: 'red',
  },
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: (Platform.OS === 'ios') ? 167 : 178,
  },
});

function getRandomInt(min, max) { // The maximum is exclusive and the minimum is inclusive
  const minCeil = Math.ceil(min);
  const maxCeil = Math.floor(max);
  return Math.floor(Math.random() * (maxCeil - minCeil)) + minCeil;
}

class ReadyTransition extends React.Component {
  state = {
    turned: false,
  }
  componentDidMount() {
    const blackDuration = (Math.floor(Math.random() * 3) + 1) * 1000;
    console.log('v', Object.values(this.props.answers || {}));
    const used = Object.values(this.props.answers || {}).map(({ redDuration }) => redDuration);
    console.log('used time', used);
    const rand = [2000, 4000, 6000, 8000, 10000].filter(time => !used.includes(time));
    console.log('rand', rand);
    const redDuration = rand[getRandomInt(0, rand.length)];
    console.log('red duration', redDuration);
    this.props.updateDuration({
      blackDuration,
      redDuration,
    });
    setTimeout(() => {
      this.setState({ turned: true });
      setTimeout(() => {
        Actions.replace(this.props.nextScene);
      }, redDuration);
    }, blackDuration);
  }
  render() {
    return (
      <View style={[styles.container, this.state.turned && styles.turned]}>
        <Text style={styles.plus} >+</Text>
      </View>
    );
  }
}

export default ReadyTransition;
