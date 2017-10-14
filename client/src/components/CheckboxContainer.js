import React from 'react';
import Checkbox from 'react-native-checkbox-heaven';
import { connect } from 'react-redux';
import { setAnswerText } from '../actions';

const CheckboxComponent = props => (
  <Checkbox
    {...props}
    checkedColor="#008080"
    checked={props.checked}
    onChange={checked => props.setAnswerText(checked || undefined)}
  />
);

const mapStateToProps = (state, ownProps) => ({
  checked: (state.answers[ownProps.header] || {})[ownProps.index],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerText: text => dispatch(setAnswerText({
    header: ownProps.header,
    index: ownProps.index,
    text,
  })),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckboxComponent);
