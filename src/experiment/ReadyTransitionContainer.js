import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { updateAnswer } from '../actions';

const mapDispatchToProps = dispatch => ({
  updateDuration: answer => dispatch(updateAnswer({
    header: 'Experiment',
    answer,
  })),
});

export default connect(
  null,
  mapDispatchToProps,
)(ReadyTransition);
