import React from 'react';
import { View } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const TextInputComponent = ({ question, nextScene }) => (
  <View>
    <TextInput autoFocus question={question} />
    <ButtonToNextScene
      question={question}
      nextScene={nextScene}
    />
  </View>
);

export default TextInputComponent;
