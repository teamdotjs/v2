import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/exampleStore';
import App from './components/App';
import { Router, Route, browserHistory } from 'react-router';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
