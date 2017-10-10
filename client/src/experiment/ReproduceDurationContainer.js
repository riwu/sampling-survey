import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { updateAnswer } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: recordedDuration => dispatch(updateAnswer({
    header: 'Experiment',
    answer: {
      round: ownProps.roundNum,
      recordedDuration,
    },
  })),
});

export default connect(
  null,
  mapDispatchToProps,
)(ReproduceDuration);
