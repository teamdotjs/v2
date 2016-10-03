import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/exampleStore';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';
import { MuiThemeProvider } from 'material-ui/styles';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={App}/>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);
