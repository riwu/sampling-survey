import React from 'react';
import { View } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const TextInputComponent = props => (
  <View>
    <TextInput {...props} />
    <ButtonToNextScene
      {...props}
    />
  </View>
);

export default TextInputComponent;
