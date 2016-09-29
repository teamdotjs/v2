import { exampleReducer } from './exampleReducer';
import { sessionReducer } from './sessionReducer';
import { combineReducers } from 'redux';

export const app = combineReducers({
    exampleReducer,
    sessionReducer,
});
