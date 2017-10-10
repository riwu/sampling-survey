import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioForm from './react-native-simple-radio-button/index';
import ButtonToNextScene from './ButtonToNextScene';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  options: {
    alignItems: 'flex-start',
  },
});

const RadioOptions = (props) => {
  const { nextScene, previousScene, disableIfLast, isEligible, ...componentProps } = props;
  return (
    <View>
      <View style={styles.container}>
        <RadioForm
          style={styles.options}
          labelColor="white"
          buttonSize={12}
          animation={false}
          {...componentProps}
        />
      </View>

      <ButtonToNextScene
        nextScene={isEligible ? nextScene : 'NotEligible'}
        previousScene={previousScene}
        disabled={(disableIfLast && props.answer.index === props.radio_props.length - 1)
          || props.answer.index === undefined ||
          ((props.radio_props[props.answer.index].hasTextInput ||
            props.radio_props[props.answer.index].dropDown)
            && !(props.answer[props.answer.index] || '').trim())
        }
      />
    </View>
  );
};

RadioOptions.defaultProps = {
  answer: {},
};

export default RadioOptions;
