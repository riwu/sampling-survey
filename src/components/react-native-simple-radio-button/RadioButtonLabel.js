import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import Style from './Style';

export default class RadioButtonLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      buttonColor: '#2196f3',
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        accessible={this.props.accessible}
        accessibilityLabel={this.props.accessibilityLabel}
        testID={this.props.testID}
        onPress={() => {
          if (!this.props.disabled) {
            this.props.onPress();
          }
        }}
      >
        <View style={[
          this.props.labelWrapStyle,
          Style.labelWrapStyle,
        ]}
        >
          <Text style={[
            Style.radioLabel,
            !this.props.labelHorizontal && Style.labelVertical,
            { color: this.props.labelColor },
            this.props.labelStyle,
          ]}
          >{this.props.obj.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
