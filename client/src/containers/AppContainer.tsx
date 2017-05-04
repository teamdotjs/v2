import { connect } from 'react-redux';
import App, { AppProps } from '../components/App';
import { State } from '../reducers/index';

function mapStateToProps(state: State): AppProps {
    return {isLoggedIn: state.session.isLoggedIn};
}

function mapDispatchToProps(_dispatch: any): {} {
    return {};
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
