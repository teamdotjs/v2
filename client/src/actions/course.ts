import 'whatwg-fetch';
import {
    errorCheck,
    createSuccess,
    createLoading,
} from './util';
import { push } from 'react-router-redux';
import { Course } from '../reducers/courseReducer';
import { LessonSummary } from '../reducers/lessonSummaryReducer';
/* TODO
These will be used for in-course lesson creation
import { Lesson } from '../reducers/lessonReducer';
import { push } from 'react-router-redux';
*/

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const courseSuccess = createSuccess('COURSE');
const loading = createLoading('COURSE');

export function loadCourses() {
    return (dispatch: any) => {
        dispatch(loading('load_courses'));
        fetch('/api/course', {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Course[]) => {
            dispatch(courseSuccess({
                type: 'load_courses',
                courses: res
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

export function loadCourse(id: number) {
    return (dispatch: any) => {
        dispatch(loading('load_course'));
        fetch(`/api/course/${id}`, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Course) => {
            dispatch(courseSuccess({
                type: 'load_course',
                course: res
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

export function createCourse() {
    return (dispatch: any) => {
        dispatch(loading('create_course_success'));
        fetch(`/api/course`, {
            method: 'POST',
            headers,
            credentials: 'same-origin',
        })
        .then(errorCheck)
        .then((res: Course) => {
            dispatch(courseSuccess({
                type: 'create_course_success',
                lesson: res
            }));
            dispatch(push('/course/' + res.id));
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}


export function loadCourseLessonSummaries(id: number) {
    return (dispatch: any) => {
        dispatch({
            type: 'load_lesson_summaries_pending'
        });
        dispatch(loading('load_lesson_summaries_success'));
        fetch(`/api/course/${id}/lesson`, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: LessonSummary[]) => {
            dispatch(courseSuccess({
                type: 'load_lesson_summaries_success',
                lessonSummaries: res
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
