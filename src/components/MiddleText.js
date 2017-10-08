import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});

const MiddleText = ({ text, children }) => (
  <View style={styles.container}>
    <Text style={styles.header}>
      {text}
    </Text>
    {children}
  </View>
);

export default MiddleText;
