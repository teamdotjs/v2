import { SessionState, sessionReducer } from './sessionReducer';
import { combineReducers } from 'redux';

export interface State {
    session: SessionState;
}

export const app = combineReducers({
    session: sessionReducer,
});
