import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'center',
  },
});

const TextInputComponent = props => (
  <View>
    <View style={[styles.container, props.width && { width: props.width }]}>
      <TextInput {...props} autoFocus />
    </View>
    <ButtonToNextScene
      {...props}
    />
  </View>
);

export default TextInputComponent;
