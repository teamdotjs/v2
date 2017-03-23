import { connect } from 'react-redux';
import AppBarRight, { AppBarRightProps } from '../components/AppBarRight';
import { State } from '../reducers/index';
import {logout} from '../actions/user';

function mapStateToProps(state: State): AppBarRightProps {
    return {
        userName: state.session.user !== undefined ? state.session.user.name : '',
    };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        onLogoutClick: () => {
            dispatch(logout());
        }
    };
}

const AppBarRightContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBarRight);

export default AppBarRightContainer;