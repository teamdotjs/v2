import { User } from './sessionReducer';
import { LessonGradeSummary } from './lessonGradeSummaryReducer';

export interface CourseGradeSummary {
    user: User;
    lessons: LessonGradeSummary[];
}

export interface CourseGradeSummaryState {
    [id: number]: CourseGradeSummary[];
}

export const courseGradeSummaryReducer = (state: CourseGradeSummaryState, action: any): CourseGradeSummaryState => {
    if (state === undefined) return { };
    switch (action.type) {
        case 'load_course_grade_summaries':
            return {...state, [action.course_id]: action.grades};
        default:
            return state;
    }
};