import React from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import CheckboxList from '../components/CheckboxList';
import { experimentStarted } from '../actions';
import { schedule } from './getMatchingSchedule';

const OTHERS = [{
  label: 'Others (please specify):',
  hasTextInput: true,
}];

const question = {
  header: 'Question 1',
  question: 'Right now, I am with (select all that apply):',
  responseComponent: (
    <CheckboxList
      labels={[
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
    console.log('started experiment question 1', this.props.hasStarted);
    if (!this.props.hasStarted) {
      this.props.experimentStarted(schedule);
    }
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

const mapStateToProps = state => ({
  hasStarted: !!state.notificationSchedule[schedule].startTime,
});

export default connect(mapStateToProps, { experimentStarted })(Question1);
