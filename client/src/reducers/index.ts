import { SessionState, sessionReducer } from './sessionReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
export interface State {
    session: SessionState;
    registration: RegistrationState;
    routing: any;
}

export const app = combineReducers({
    session: sessionReducer,
    registration: registrationReducer,
    routing: routerReducer,
});
