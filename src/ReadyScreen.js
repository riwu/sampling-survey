import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import plus from '../images/plus.png';
import history from 'history';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 50,
  },
  ready: {
    color: 'white',
    marginTop: 100,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  round: {
    color: 'white',
  },
  image: {
    marginTop: 100,
    width: 25,
    height: 25,
  },
  instructionContainer: {
    flexDirection: 'row',
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 5,
    flex: 0.9,
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
  },
});

const ReadyScreen = () => (
  <View>
    <View style={styles.container}>
      <Text style={styles.ready}>READY FOR YOUR TASK?</Text>
      <Text style={styles.round}>ROUND 1 OF 5</Text>
      <Image style={styles.image} source={plus} />
      <View style={styles.instructionContainer}>
        <View style={{ flex: 0.05 }} />
        <View style={styles.instructions}>
          <Text style={styles.tellUs}>Tell us how long the screen turns red for</Text>
          <Text style={styles.text}>1. Click 'ready' and the screen will turn red.</Text>
          <Text style={styles.text}>2. When the screen is red:</Text>
          <Text style={styles.text}>- Focus on the cross above(+)</Text>
          <Text style={styles.text}>- <Text style={{ textDecorationLine: 'underline' }}>Don't count</Text> how much time has passed</Text>
          <Text style={styles.text}>- We're interested in what it feels like to you</Text>
        </View>
        <View style={{ flex: 0.05 }} />
      </View>
    </View>
    <Button title="Ready" style={styles.button} onPress={() => history.push('/ReadyTransition')} />
  </View>
);

export default ReadyScreen;
