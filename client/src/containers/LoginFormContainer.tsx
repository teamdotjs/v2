import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm/LoginForm';
import { login } from '../actions/user';

function mapStateToProps(_state: any): LoginProps {
    return {
        lock: _state.session.pending,
        error: _state.session.error
    };
}

function mapDispatchToProps(dispatch: any): LoginProps {
    return {
        onSubmit(uname: string, pass: string) {
            dispatch(login(uname, pass));
        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
