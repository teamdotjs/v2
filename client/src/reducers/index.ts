import { SessionState, sessionReducer } from './sessionReducer';
import { LessonState, lessonReducer } from './lessonReducer';
import { LessonSummaryState, lessonSummaryReducer } from './lessonSummaryReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { PracticeState, practiceReducer } from './practiceReducer';
import { ErrorState, errorReducer } from './errorReducer';
import { LoadingState, loadingReducer } from './loadingReducer';
import { CourseState, courseReducer } from './courseReducer';
import { DrawerState, drawerReducer } from './drawerReducer';
import { TakingState, takingReducer} from './practiceTakingReducer';
import { LessonGradeSummaryState, lessonGradeSummaryReducer } from './lessonGradeSummaryReducer';
import { CourseGradeSummaryState, courseGradeSummaryReducer } from './courseGradeSummaryReducer';
import { CourseStudentState, courseStudentReducer } from './courseStudentReducer';

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
    loading: LoadingState;
    course: CourseState;
    drawer: DrawerState;
    practiceTaking: TakingState;
    lessonGradeSummary: LessonGradeSummaryState;
    courseGradeSummary: CourseGradeSummaryState;
    courseStudent: CourseStudentState;
}

export const app = combineReducers({
    errors: errorReducer,
    session: sessionReducer,
    registration: registrationReducer,
    routing: routerReducer,
    lesson: lessonReducer,
    lessonSummary: lessonSummaryReducer,
    practice: practiceReducer,
    loading: loadingReducer,
    course: courseReducer,
    drawer: drawerReducer,
    practiceTaking: takingReducer,
    lessonGradeSummary: lessonGradeSummaryReducer,
    courseGradeSummary: courseGradeSummaryReducer,
    courseStudent: courseStudentReducer
});
