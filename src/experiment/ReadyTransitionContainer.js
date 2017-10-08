import { connect } from 'react-redux';
import ReadyTransition from './ReadyTransition';
import { setAnswerText } from '../actions';

const getHeader = trial => `Actual Duration${trial ? ' Trial' : ''}`;

const mapStateToProps = (state, ownProps) => ({
  answers: state.answers[getHeader(ownProps.trial)],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setAnswerText: (answers, fields) => dispatch(setAnswerText({
    header: getHeader(ownProps.trial),
    text: [
      ...(answers || []),
      {
        round: ownProps.roundNum,
        ...fields,
      },
    ],
  })),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  setAnswerText: fields => dispatchProps.setAnswerText(stateProps.answers, fields),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ReadyTransition);
