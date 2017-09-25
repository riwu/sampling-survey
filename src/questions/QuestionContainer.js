import { connect } from 'react-redux';
import Question from './Question';

const mapStateToProps = (state, ownProps) => {
  const answer = state.answers[ownProps.question] || {};
  return {
    ...ownProps,
    disabled: !answer.index || (!(answer[answer.index] || '').trim()),
  };
};

export default connect(
  mapStateToProps,
)(Question);
