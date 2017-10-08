import { connect } from 'react-redux';
import ButtonToNextScene from './ButtonToNextScene';

const mapStateToProps = (state, ownProps) => {
  const answer = state.answers[ownProps.header];
  return {
    disabled: (answer === undefined) || (typeof answer === 'string' && answer.trim() === ''),
  };
};

export default connect(
  mapStateToProps,
)(ButtonToNextScene);
