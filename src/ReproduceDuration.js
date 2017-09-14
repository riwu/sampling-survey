import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  instructionContainer: {
    flexDirection: 'row',
  },
  instructions: {
    backgroundColor: 'lightgrey',
    marginTop: 30,
    marginBottom: 10,
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
  readyButton: {
    color: 'blue',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 5,
    margin: 20,
    width: 300,
  },
  plus: {
    color: 'white',
    fontSize: 50,
    marginTop: 50,
  },
});

const ReproduceDuration = () => (
  <View style={styles.container}>
    <Text style={styles.ready}>READY FOR YOUR TASK?</Text>
    <Text style={styles.round}>ROUND 1 OF 5</Text>
    <Text style={styles.plus} >+</Text>
    <View style={styles.instructionContainer}>
      <View style={{ flex: 0.1 }} />
      <View style={styles.instructions}>
        <Text style={styles.tellUs}>Tell us how long the screen turns red for</Text>
        <Text style={styles.text}>1. Click 'ready' and the screen will turn red.</Text>
        <Text style={styles.text}>2. When the screen is red:</Text>
        <Text style={styles.text}>- Focus on the cross above(+)</Text>
        <Text style={styles.text}>- <Text style={{ textDecorationLine: 'underline' }}>Don't count</Text> how much time has passed</Text>
        <Text style={styles.text}>- We're interested in what it
            <Text style={{ fontStyle: 'italic' }}> feels like</Text> to you
          </Text>
      </View>
      <View style={{ flex: 0.1 }} />
    </View>
    <Link to="/ReadyTransition">
      <Text style={styles.readyButton}>Ready</Text>
    </Link>
  </View>
  );

export default ReproduceDuration;
