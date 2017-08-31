import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import plus from '../images/plus.png';

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

const ReadyTransition = () => (
  <View>
    <Image style={styles.image} source={plus} />
  </View>
);

export default ReadyTransition;
