import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    color: 'white',
    borderWidth: 0.5,
    borderBottomColor: 'white',
    marginLeft: 30,
  },
});

const TextInputComponent = props => (
  <TextInput
    style={styles.input}
    {...props}
    onChangeText={(text) => {
      props.onChangeText(props.numbersOnly ? text.replace(/\D/g, '') : text);
    }}
    ref={(ref) => {
      if (props.setTextRef) props.setTextRef(ref);
    }}
  />
);

export default TextInputComponent;
