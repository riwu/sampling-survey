import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    color: 'white',
    borderWidth: 0.5,
    borderBottomColor: 'white',
  },
});

const TextInputComponent = props => (
  <TextInput
    opacity={props.show ? 1 : 0}
    editable={props.show}
    maxLength={99}
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
    onChangeText={(text) => {
      props.onChangeText(props.numbersOnly ? text.replace(/\D/g, '') : text);
    }}
    ref={(ref) => {
      if (props.setTextRef) props.setTextRef(ref);
    }}
  />
);

TextInputComponent.defaultProps = {
  show: true,
};

export default TextInputComponent;
