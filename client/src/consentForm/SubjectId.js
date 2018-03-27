import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInput from '../components/TextInputResponse';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  textInput: {
    width: 130,
    fontSize: 20,
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const SubjectId = props => (
  <View style={styles.container}>
    <Text style={styles.text}>Please enter your Subject ID:</Text>
    <TextInput
      autoCapitalize="none"
      autoFocus
      style={styles.textInput}
      header="SubjectId"
      {...props}
    />
  </View>
);

export default SubjectId;
