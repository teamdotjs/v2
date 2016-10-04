import { connect } from 'react-redux';
import { RegistrationForm, RegistrationProps} from '../components/RegistrationForm';
import { register } from '../actions/user';
import { browserHistory } from 'react-router';

function mapStateToProps(_state: any): RegistrationProps {
    return {};
}

function mapDispatchToProps(dispatch: any): RegistrationProps {
    return {
        onSubmit(uname: string, pass: string) {
            dispatch(register(uname, pass));
            browserHistory.push('/');
        }
    };
}

const RegistrationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);

export default RegistrationFormContainer;
