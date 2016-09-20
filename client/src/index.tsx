import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/exampleStore';
import SmartCounter from './containers/SmartCounter';

ReactDOM.render(
    <Provider store={store}>
        <SmartCounter />
    </Provider>,
    document.getElementById('app')
);
