import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/exampleStore';
import SmartCounter from './containers/SmartCounter';
import { Router, Route, browserHistory } from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={SmartCounter}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
