import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const width = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
  container: {
    marginLeft: width,
    marginRight: width,
  },
});

const TextInputComponent = props => (
  <View>
    <View style={styles.container}>
      <TextInput {...props} />
    </View>
    <ButtonToNextScene
      {...props}
    />
  </View>
);

export default TextInputComponent;
