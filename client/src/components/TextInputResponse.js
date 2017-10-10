import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from './TextInputContainer';
import ButtonToNextScene from './ButtonToNextSceneContainer';

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'center',
  },
});

const TextInputComponent = (props) => {
  const { nextScene, header, previousScene, ...inputProps } = props;
  return (
    <View>
      <View style={[styles.container, props.width && { width: props.width }]}>
        <TextInput header={header} {...inputProps} autoFocus />
      </View>
      <ButtonToNextScene
        nextScene={nextScene}
        previousScene={previousScene}
        header={header}
      />
    </View>
  );
};

export default TextInputComponent;
