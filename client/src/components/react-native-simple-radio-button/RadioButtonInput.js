import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Style from './Style';

export default class RadioButtonInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      buttonColor: props.buttonColor || '#2196f3',
    };
  }
  render() {
    const innerSize = { width: 20, height: 20, borderRadius: 20 / 2 };
    const outerSize = { width: 20 + 10, height: 20 + 10, borderRadius: (20 + 10) / 2 };
    if (this.props.buttonSize) {
      innerSize.width = this.props.buttonSize;
      innerSize.height = this.props.buttonSize;
      innerSize.borderRadius = this.props.buttonSize / 2;
      outerSize.width = this.props.buttonSize + 10;
      outerSize.height = this.props.buttonSize + 10;
      outerSize.borderRadius = (this.props.buttonSize + 10) / 2;
    }
    if (this.props.buttonOuterSize) {
      outerSize.width = this.props.buttonOuterSize;
      outerSize.height = this.props.buttonOuterSize;
      outerSize.borderRadius = this.props.buttonOuterSize / 2;
    }
    let outerColor = this.props.buttonOuterColor;
    const borderWidth = this.props.borderWidth || 3;
    let innerColor = this.props.buttonInnerColor;
    if (this.props.buttonColor) {
      outerColor = this.props.buttonColor;
      innerColor = this.props.buttonColor;
    }
    const c = (
      <View style={[
        Style.radioNormal,
        this.props.isSelected && Style.radioActive,
        this.props.isSelected && innerSize,
        this.props.isSelected && { backgroundColor: innerColor },
      ]}
      />
    );
    const radioStyle = [
      Style.radio,
      {
        borderColor: outerColor,
        borderWidth,
      },
      this.props.buttonStyle,
      outerSize,
    ];

    if (this.props.disabled) {
      return (
        <View style={this.props.buttonWrapStyle} >
          <View style={radioStyle}>
            {c}
          </View>
        </View>
      );
    }

    return (
      <View style={this.props.buttonWrapStyle} >
        <TouchableOpacity
          accessible={this.props.accessible}
          accessibilityLabel={this.props.accessibilityLabel}
          testID={this.props.testID}
          style={radioStyle}
          onPress={this.props.onPress}
        >
          {c}
        </TouchableOpacity>
      </View>
    );
  }
}

RadioButtonInput.defaultProps = {
  buttonInnerColor: '#2196f3',
  buttonOuterColor: '#2196f3',
  disabled: false,
};
