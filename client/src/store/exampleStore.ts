import { createStore } from 'redux';
import { exampleReducer } from '../reducers/exampleReducer';


let store = createStore(exampleReducer, {sum: 0});

export default store;
