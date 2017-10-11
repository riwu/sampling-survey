import { connect } from 'react-redux';
import InformationSheet from './InformationSheet';
import { setDeviceId } from '../actions';

export default connect(
  null,
  { onPress: setDeviceId },
)(InformationSheet);
