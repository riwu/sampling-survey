import { connect } from 'react-redux';
import CountryPicker from './CountryPicker';
import { setAnswerText } from '../actions/index';

const mapStateToProps = (state, ownProps) => ({
  cca2: (state.answers[ownProps.header] || [])[-1] || 'SG',
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
