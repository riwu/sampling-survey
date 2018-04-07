import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import Style from './Style';

const RadioButtonLabel = props => (
  <TouchableWithoutFeedback
    accessible={props.accessible}
    accessibilityLabel={props.accessibilityLabel}
    testID={props.testID}
    onPress={() => {
        if (!props.disabled) {
          props.onPress();
        }
      }}
  >
    <View style={[props.labelWrapStyle, Style.labelWrapStyle]}>
      <Text
        style={[
            Style.radioLabel,
            !props.labelHorizontal && Style.labelVertical,
            { color: props.labelColor },
            props.labelStyle,
          ]}
      >
        {props.obj.label}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
export default RadioButtonLabel;
