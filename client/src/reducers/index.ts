import { sessionReducer } from './sessionReducer';
import { combineReducers } from 'redux';

export const app = combineReducers({
    session: sessionReducer,
});
