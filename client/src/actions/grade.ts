import 'whatwg-fetch';
import {
    errorCheck,
    createSuccess,
    createLoading
} from './util';
import { LessonGradeSummary } from '../reducers/lessonGradeSummaryReducer';
import { CourseGradeSummary } from '../reducers/courseGradeSummaryReducer';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const success = createSuccess('GRADE');
const loading = createLoading('GRADE');

export function loadUserGradeSummaries() {
    return (dispatch: any) => {
        dispatch(loading('load_user_grade_summaries'));
        fetch('/api/grade/summaries', {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: LessonGradeSummary[]) => {
            dispatch(success({
                type: 'load_user_grade_summaries',
                grades: res
            }));
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}

export function loadCourseGradeSummaries(id: number) {
    return (dispatch: any) => {
        dispatch(loading('load_course_grade_summaries'));
        fetch(`/api/grade/course/${id}/summaries`, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: CourseGradeSummary[]) => {
            dispatch(success({
                type: 'load_course_grade_summaries',
                grades: res,
                course_id: id
            }));
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}