import { createStore } from 'redux';
import { app } from '../reducers/index';


let store = createStore(app);

export default store;
