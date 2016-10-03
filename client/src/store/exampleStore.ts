import { createStore } from 'redux';
import { app } from '../reducers/index';

declare var window: any;
let store = createStore(app, window.devToolsExtension ? window.devToolsExtension() : undefined);

export default store;
