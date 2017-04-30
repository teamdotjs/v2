import { connect } from 'react-redux';
import AppBarRight, { AppBarRightProps } from '../components/AppBarRight';
import { State } from '../reducers/index';
import {logout} from '../actions/user';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State): AppBarRightProps {
    return {
        loading: isLoading('LESSON', state.loading),
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