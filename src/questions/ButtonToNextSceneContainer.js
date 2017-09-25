import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  disabled: !(state.answers[ownProps.question] || '').trim(),
});

export default connect(
  mapStateToProps,
)(ButtonToNextScene);
