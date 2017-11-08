import { connect } from 'react-redux';
import { Platform } from 'react-native';
import ReproduceDuration from './ReproduceDuration';
import { updateTrial } from '../actions/index';

const mapStateToProps = (state, ownProps) => ({
  nextScene: (ownProps.roundNum === 3 && Platform.OS !== 'ios') ? 'Acknowledgement' : ownProps.nextScene,
  actualDuration: (state.trialAnswers[state.trialAnswers.length - 1] || {}).redDuration,
});

export default connect(
  mapStateToProps,
  { updateDuration: updateTrial },
)(ReproduceDuration);
