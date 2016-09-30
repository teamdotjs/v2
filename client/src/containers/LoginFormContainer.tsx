import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm/LoginForm';
import { login } from '../actions/session';

function mapStateToProps(_state: any): LoginProps {
    return {};
}

function mapDispatchToProps(dispatch: any): LoginProps {
    return {
        onSubmit(uname: String, _pass: String) {
            dispatch(login(uname));
        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
