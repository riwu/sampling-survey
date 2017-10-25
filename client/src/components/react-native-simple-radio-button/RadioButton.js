import React from 'react';
import { View, LayoutAnimation, Dimensions } from 'react-native';
import Dropdown from '../react-native-material-dropdown';
import RadioButtonInput from './RadioButtonInput';
import RadioButtonLabel from './RadioButtonLabel';
import TextInput from '../TextInput';
import Style from './Style';

const width = Dimensions.get('window').width;

export default class RadioButton extends React.Component {
  static defaultProps = {
    isSelected: false,
    buttonColor: '#2196f3',
    labelHorizontal: true,
    disabled: false,
    idSeparator: '|',
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUpdate() {
    if (this.props.animation) {
      LayoutAnimation.spring();
    }
  }
  render() {
    const c = this.props.children;

    const idSeparator = (this.props.idSeparator) ? this.props.idSeparator : '|';
    const idSeparatorAccessibilityLabelIndex = (this.props.accessibilityLabel)
      ? this.props.accessibilityLabel.indexOf(idSeparator) : -1;
    const idSeparatorTestIdIndex = (this.props.testID)
      ? this.props.testID.indexOf(idSeparator) : -1;

    const accessibilityLabel = (this.props.accessibilityLabel)
      ? (idSeparatorAccessibilityLabelIndex !== -1
        ? this.props.accessibilityLabel.substring(0, idSeparatorAccessibilityLabelIndex) : this.props.accessibilityLabel) : 'radioButton';
    const testID = (this.props.testID)
      ? (idSeparatorTestIdIndex !== -1
        ? this.props.testID.substring(0, idSeparatorTestIdIndex) : this.props.testID) : 'radioButton';

    const accessibilityLabelIndex = (this.props.accessibilityLabel && idSeparatorAccessibilityLabelIndex !== -1)
      ? this.props.accessibilityLabel.substring(idSeparatorAccessibilityLabelIndex + 1) : '';
    var testIDIndex = (this.props.testID && testIDIndex !== -1)
      ? this.props.testID.split(testIDIndex + 1) : '';
    const showTextInput = !!this.props.obj.hasTextInput && (this.props.isSelected || !!this.props.answerText);
    let renderContent = false;
    renderContent = c ? (
      <View style={[
        Style.radioWrap,
        this.props.style,
        this.props.formHorizontal && { width: width / 4 },
        !this.props.labelHorizontal && Style.labelVerticalWrap,
      ]}
      >
        {c}
      </View>
    ) : (
      <View>
        <View style={[
          Style.radioWrap,
          this.props.style,
          this.props.formHorizontal && { width: width / 3.9 }, // make sure it can fit exactly 3
          !this.props.labelHorizontal && Style.labelVerticalWrap,
        ]}
        >
          <RadioButtonInput
            {...this.props}
            accessibilityLabel={`${accessibilityLabel}Input${accessibilityLabelIndex}`}
            testID={`${testID}Input${testIDIndex}`}
          />
          <RadioButtonLabel
            {...this.props}
            accessibilityLabel={`${accessibilityLabel}Label${accessibilityLabelIndex}`}
            testID={`${testID}Label${testIDIndex}`}
          />
          {
            !this.props.obj.dropDown ? null :
            <Dropdown
                animationDuration={0}
                labelHeight={15}
                itemCount={10}
                itemPadding={12}
                value={this.props.answerText}
                onChangeText={(text) => {
                  this.props.setAnswerText(text);
                  this.props.onPress();
                }}
                containerStyle={Style.dropDown}
                baseColor="white"
                selectedItemColor="black"
                textColor="white"
                itemColor="green"
                label={this.props.obj.dropDown.label}
                data={this.props.obj.dropDown.data.map(value => ({
                  value,
                }))}
              />
          }
        </View>
        <TextInput
          style={Style.textInput}
          setTextRef={this.props.setTextRef}
          opacity={showTextInput ? 1 : 0}
          editable={showTextInput}
          onFocus={this.props.onPress}
          onChangeText={this.props.setAnswerText}
          value={this.props.answerText}
        />
      </View>
    );
    return (
      <View>
        {renderContent}
      </View>
    );
  }
}
