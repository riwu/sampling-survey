import { connect } from 'react-redux';
import InformationSheet from './InformationSheet';
import { checkIfDisqualified } from '../actions';

export default connect(null, { onPress: checkIfDisqualified })(InformationSheet);
