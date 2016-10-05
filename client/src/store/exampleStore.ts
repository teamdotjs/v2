import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { app } from '../reducers/index';

declare var window: any;

let store = createStore(
    app,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
