import { connect } from 'react-redux';
import InformationSheet from './InformationSheet';
import { postDevice } from '../actions/index';

export default connect(
  null,
  { onPress: postDevice },
)(InformationSheet);
