import { SessionState, sessionReducer } from './sessionReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { combineReducers } from 'redux';

export interface State {
    session: SessionState;
    registration: RegistrationState;
}

export const app = combineReducers({
    session: sessionReducer,
    registration: registrationReducer,
});
