import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: 207,
  },
});

class ReadyTransition extends React.Component {
  state = {
    turned: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ turned: true });
    }, (Math.floor(Math.random() * 3) + 1) * 1000,
    setTimeout(() => {
      this.props.history.push('/ReproduceDuration');
    }, 1000 * { 0: 2, 1: 6, 2: 10 }[Math.floor(Math.random() * 3)]));
  }
  render() {
    return (
      <View style={this.state.turned ? styles.container : null}>
        <Text style={styles.plus} >+</Text>
      </View>
    );
  }
}

export default ReadyTransition;
