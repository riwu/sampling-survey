import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addNewAnswer } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateDuration: answer => dispatch(addNewAnswer({
    header: 'Experiment trial',
    answer: {
      round: ownProps.roundNum,
      ...answer,
    },
  })),
});

export default connect(
  null,
  mapDispatchToProps,
)(ReadyTransition);
