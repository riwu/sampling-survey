import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioForm from '../react-native-simple-radio-button';
import ButtonToNextScene from './ButtonToNextScene';

const styles = StyleSheet.create({
  options: {
    alignItems: 'flex-start',
  },
});

const RadioOptions = props => (
  <View>
    <RadioForm
      style={styles.options}
      labelColor="white"
      buttonSize={12}
      animation={false}
      {...props}
    />
    <ButtonToNextScene
      nextScene={props.nextScene}
      disabled={props.answer.index === undefined ||
        (props.radio_props[props.answer.index].hasTextInput &&
         !(props.answer[props.answer.index] || '').trim())
      }
    />
  </View>
);

RadioOptions.defaultProps = {
  hasOthers: true,
};

export default RadioOptions;
