import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 120,
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const Button = ({ text, onPress }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableHighlight>
);

export default Button;
