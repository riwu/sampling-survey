import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Checkbox from './react-native-checkbox-heaven';
import { setAnswerText, addExperimentAnswer } from '../actions';
import TextInput from './TextInput';
import { schedule } from '../experiment/getMatchingSchedule';

const styles = StyleSheet.create({
  text: {
    marginLeft: 40,
  },
});

const CheckboxComponent = props => (
  <View>
    <Checkbox
      {...props}
      label={props.label.label}
      checkedColor="#008080"
      checked={props.value}
      iconSize={40}
      onChange={(checked) => {
        props.setAnswerText(checked || undefined);
        if (checked && props.label.hasTextInput) {
          console.log('focusing');
          this.ref.focus();
        }
      }}
    />
    <TextInput
      show={!!props.label.hasTextInput && (props.value !== undefined)}
      setTextRef={(ref) => {
        if (props.label.hasTextInput) {
          this.ref = ref;
        }
      }}
      style={styles.text}
      value={props.value === true ? '' : props.value}
      onChangeText={props.setAnswerText}
    />
  </View>
);

const mapStateToProps = (state, ownProps) => ({
  value: ((schedule
    ? (state.experimentAnswers[schedule] || {})[ownProps.header]
    : state.answers[ownProps.header]) || {})[ownProps.index],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerText: (text) => {
    if (schedule) {
      dispatch(addExperimentAnswer(ownProps.header, schedule, { [ownProps.index]: text }));
    } else {
      dispatch(setAnswerText({
        header: ownProps.header,
        index: ownProps.index,
        text,
      }));
    }
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckboxComponent);
