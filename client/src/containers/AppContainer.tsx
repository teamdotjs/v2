import { connect } from 'react-redux';
import App, { AppProps } from '../components/App';
import { State } from '../reducers/index';
import { loginCheck } from '../actions/user';


function mapStateToProps(state: State): AppProps {
    return {isLoggedIn: state.session.uname !== undefined};
}

function mapDispatchToProps(dispatch: any): {} {
    dispatch(loginCheck());
    return {};
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
