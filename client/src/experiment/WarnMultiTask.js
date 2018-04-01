import React from 'react';
import { connect } from 'react-redux';
import { experimentStarted } from '../actions';
import { schedule } from './getMatchingSchedule';
import MiddleText from '../components/MiddleText';

class WarnMultiTask extends React.Component {
  componentDidMount() {
    console.log('started experiment', this.props.hasStarted);
    if (!this.props.hasStarted) {
      this.props.experimentStarted(schedule);
    }
  }
  render() {
    return <MiddleText text="DO NOT MULTITASK" />;
  }
}

const mapStateToProps = state => ({
  hasStarted: !!(state.notificationSchedule[schedule] || {}).startTime,
});

export default connect(mapStateToProps, { experimentStarted })(WarnMultiTask);
