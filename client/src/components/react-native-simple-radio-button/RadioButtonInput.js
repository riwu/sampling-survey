import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Style from './Style';

const RadioButtonInput = (props) => {
  const innerSize = { width: 20, height: 20, borderRadius: 20 / 2 };
  const outerSize = { width: 20 + 10, height: 20 + 10, borderRadius: (20 + 10) / 2 };
  if (props.buttonSize) {
    innerSize.width = props.buttonSize;
    innerSize.height = props.buttonSize;
    innerSize.borderRadius = props.buttonSize / 2;
    outerSize.width = props.buttonSize + 10;
    outerSize.height = props.buttonSize + 10;
    outerSize.borderRadius = (props.buttonSize + 10) / 2;
  }
  if (props.buttonOuterSize) {
    outerSize.width = props.buttonOuterSize;
    outerSize.height = props.buttonOuterSize;
    outerSize.borderRadius = props.buttonOuterSize / 2;
  }
  let outerColor = props.buttonOuterColor;
  const borderWidth = props.borderWidth || 3;
  let innerColor = props.buttonInnerColor;
  if (props.buttonColor) {
    outerColor = props.buttonColor;
    innerColor = props.buttonColor;
  }
  const c = (
    <View
      style={[
        Style.radioNormal,
        props.isSelected && Style.radioActive,
        props.isSelected && innerSize,
        props.isSelected && { backgroundColor: innerColor },
      ]}
    />
  );
  const radioStyle = [
    Style.radio,
    {
      borderColor: outerColor,
      borderWidth,
    },
    props.buttonStyle,
    outerSize,
  ];

  if (props.disabled) {
    return (
      <View style={props.buttonWrapStyle}>
        <View style={radioStyle}>{c}</View>
      </View>
    );
  }

  return (
    <View style={props.buttonWrapStyle}>
      <TouchableOpacity
        accessible={props.accessible}
        accessibilityLabel={props.accessibilityLabel}
        testID={props.testID}
        style={radioStyle}
        onPress={props.onPress}
      >
        {c}
      </TouchableOpacity>
    </View>
  );
};

RadioButtonInput.defaultProps = {
  buttonInnerColor: '#2196f3',
  buttonOuterColor: '#2196f3',
  disabled: false,
};

export default RadioButtonInput;
