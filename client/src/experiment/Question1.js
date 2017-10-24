import React from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import RadioOptions from '../components/RadioOptionsContainer';
import { experimentStarted } from '../actions';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const question = {
  header: 'Question 1',
  question: 'Right now, I am with (select all that apply):',
  responseComponent: (
    <RadioOptions
      radio_props={[
        'My boyfriend / girlfriend / partner / spouse',
        'My friends / colleagues / schoolmates',
        'My family',
        'Alone',
      ].map(option => ({
        label: option,
      })).concat(OTHERS)}
    />
  ),
};

class Question1 extends React.Component {
  componentDidMount() {
    this.props.experimentStarted();
  }
  render() {
    return (
      <Question
        {...question}
        nextScene={this.props.nextScene}
      />
    );
  }
}

export default connect(null, { experimentStarted })(Question1);
