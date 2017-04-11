import { SessionState, sessionReducer } from './sessionReducer';
import { LessonState, lessonReducer } from './lessonReducer';
import { LessonSummaryState, lessonSummaryReducer } from './lessonSummaryReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { PracticeState, practiceReducer } from './practiceReducer';
import { ErrorState, errorReducer } from './errorReducer';
import { CourseState, courseReducer } from './courseReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export interface State {
    errors: ErrorState;
    session: SessionState;
    registration: RegistrationState;
    routing: any;
    lesson: LessonState;
    lessonSummary: LessonSummaryState;
    practice: PracticeState;
    course: CourseState;
}

export const app = combineReducers({
    errors: errorReducer,
    session: sessionReducer,
    registration: registrationReducer,
    routing: routerReducer,
    lesson: lessonReducer,
    lessonSummary: lessonSummaryReducer,
    practice: practiceReducer,
    course: courseReducer,
});
