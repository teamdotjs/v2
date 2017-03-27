import { SessionState, sessionReducer } from './sessionReducer';
import { LessonState, lessonReducer } from './lessonReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { PracticeState, practiceReducer } from './practiceReducer';
import { ErrorState, errorReducer } from './errorReducer';
import { DrawerState, drawerReducer } from './drawerReducer';
import { LoadingState, loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export interface State {
    errors: ErrorState;
    session: SessionState;
    registration: RegistrationState;
    routing: any;
    lesson: LessonState;
    practice: PracticeState;
    drawer: DrawerState;
    loading: LoadingState;
}

export const app = combineReducers({
    errors: errorReducer,
    session: sessionReducer,
    registration: registrationReducer,
    routing: routerReducer,
    lesson: lessonReducer,
    practice: practiceReducer,
    drawer: drawerReducer,
    loading: loadingReducer,
});
