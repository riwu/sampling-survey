import { connect } from 'react-redux';
import CountryPicker from './CountryPicker';
import { setAnswerText } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  cca2: state.answers[ownProps.header] || 'SG',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: country => dispatch(setAnswerText({
    header: ownProps.header,
    text: country.cca2,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryPicker);
