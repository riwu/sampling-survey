import { connect } from 'react-redux';
import { Platform } from 'react-native';
import ReproduceDuration from './ReproduceDuration';
import { updateTrial } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  nextScene: (ownProps.roundNum === 3 && Platform.OS !== 'ios') ? 'Acknowledgement' : ownProps.nextScene,
  answers: state.trialAnswers,
});

export default connect(
  mapStateToProps,
  { updateDuration: updateTrial },
)(ReproduceDuration);
