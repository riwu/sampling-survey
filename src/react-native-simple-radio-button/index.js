import React from 'react';
import { View, Platform, UIManager } from 'react-native';
import RadioButton from './RadioButton';
import Style from './Style';

export default class RadioForm extends React.Component {
  static defaultProps = {
    radio_props: [],
    initial: 0,
    buttonColor: '#2196f3',
    formHorizontal: false,
    labelHorizontal: true,
    animation: true,
    labelColor: '#000',
    disabled: false,
    activeIndex: undefined,
  }

  constructor(props) {
    super(props);
    this.textRefs = {};
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this._renderButton = this._renderButton.bind(this);
  }

  _renderButton(obj, i) {
    return (
      <RadioButton
        accessible={this.props.accessible}
        accessibilityLabel={(this.props.accessibilityLabel)
          ? (`${this.props.accessibilityLabel}|${i}`) : (`radioButton|${i}`)}
        testID={(this.props.testID)
          ? (`${this.props.testID}|${i}`) : (`radioButton|${i}`)}
        isSelected={this.props.answer.index === i}
        obj={obj}
        key={i}
        index={i}
        buttonColor={this.props.buttonColor}
        buttonSize={this.props.buttonSize}
        buttonOuterSize={this.props.buttonOuterSize}
        labelHorizontal={this.props.labelHorizontal}
        labelColor={this.props.labelColor}
        labelStyle={this.props.labelStyle}
        style={this.props.radioStyle}
        animation={this.props.animation}
        disabled={this.props.disabled}
        onPress={() => {
          this.props.setAnswerIndex(i);
          Object.entries(this.textRefs).forEach(([index, textRef]) => {
            if (!obj.hasTextInput) {
              return;
            }
            if (String(i) === index) {
              textRef.focus();
            } else {
              textRef.blur();
            }
          });
        }}
        setAnswerText={text => this.props.setAnswerText(i, text)}
        setTextRef={(ref) => { this.textRefs[i] = ref; }}
        answerText={this.props.answer[i]}
      />
    );
  }

  render() {
    let renderContent = false;
    if (this.props.radio_props.length) {
      renderContent = this.props.radio_props.map(this._renderButton);
    } else {
      renderContent = this.props.children;
    }
    return (
      <View style={[
        Style.radioFrom,
        this.props.style,
        this.props.formHorizontal && Style.formHorizontal,
      ]}
      >
        {renderContent}
      </View>
    );
  }
}
