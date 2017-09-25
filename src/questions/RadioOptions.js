import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm from '../react-native-simple-radio-button';
import Button from '../components/Button';

const styles = StyleSheet.create({
  options: {
    alignItems: 'flex-start',
  },
  button: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
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
    <View style={styles.button}>
      <Button
        onPress={() => {
          Actions[props.nextScene]();
        }}
        text="Next"
        disabled={props.answer.index === undefined ||
          (props.radio_props[props.answer.index].hasTextInput &&
           !(props.answer[props.answer.index] || '').trim())
        }
      />
    </View>
  </View>
);

RadioOptions.defaultProps = {
  hasOthers: true,
};

export default RadioOptions;
