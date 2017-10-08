import { connect } from 'react-redux';
import ReproduceDuration from './ReproduceDuration';
import { updateAnswer } from '../actions';

const header = 'Experiment trial';

const mapStateToProps = (state) => {
  const answers = state.answers[header] || [];
  return {
    actualDuration: (answers[answers.length - 1] || {}).redDuration,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: recordedDuration => dispatch(updateAnswer({
    header,
    answer: {
      round: ownProps.roundNum,
      recordedDuration,
    },
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReproduceDuration);
