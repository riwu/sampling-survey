import { connect } from 'react-redux';
import Acknowledgement from './Acknowledgement';
import { scheduleNotification } from '../actions/index';

const mapStateToProps = state => ({
  answers: state.answers,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  scheduleNotification: () => dispatchProps.scheduleNotification(stateProps.answers),
});

export default connect(
  mapStateToProps,
  { scheduleNotification },
  mergeProps,
)(Acknowledgement);
