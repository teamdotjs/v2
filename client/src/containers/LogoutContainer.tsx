import { connect } from 'react-redux';
import Logout, { LogoutProps } from '../components/Logout';
import { State } from '../reducers/index';
import {logout} from '../actions/user';

function mapStateToProps(state: State): LogoutProps {
    return {
        isLoggedIn: state.session.isLoggedIn,
        userName: state.session.user ? state.session.user.name : '',
    };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        onLogoutClick: () => {
            dispatch(logout());
        }
    };
}

const LogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);

export default LogoutContainer;