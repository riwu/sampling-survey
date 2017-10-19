import { connect } from 'react-redux';
import Acknowledgement from './Acknowledgement';
import { scheduleNotification } from '../actions';

const mapStateToProps = state => ({
  answer: state.answers,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  scheduleNotification: dispatchProps.scheduleNotification(stateProps.answers),
});

export default connect(
  mapStateToProps,
  { scheduleNotification },
  mergeProps,
)(Acknowledgement);
