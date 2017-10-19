import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { addNewTrial } from '../actions';

export default connect(
  null,
  { updateDuration: addNewTrial },
)(ReadyTransition);
