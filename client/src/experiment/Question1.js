import React from 'react';
import { connect } from 'react-redux';
import { experimentStarted } from '../actions/index';
import { schedule } from './getMatchingSchedule';
import WithWho from './WithWho';

class Question1 extends React.Component {
  componentDidMount() {
    console.log('started experiment question 1', this.props.hasStarted);
    if (!this.props.hasStarted) {
      this.props.experimentStarted(schedule);
    }
  }
  render() {
    return (
      <WithWho
        header="Question 1"
        question="Right now, I am with (select all that apply):"
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasStarted: !!state.notificationSchedule[schedule].startTime,
});

export default connect(mapStateToProps, { experimentStarted })(Question1);
