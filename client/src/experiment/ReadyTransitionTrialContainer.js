import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addNewAnswer } from '../actions';

const mapDispatchToProps = dispatch => ({
  updateDuration: answer => dispatch(addNewAnswer({
    header: 'Experiment trial',
    answer,
  })),
});

export default connect(
  null,
  mapDispatchToProps,
)(ReadyTransition);
