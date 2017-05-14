import 'whatwg-fetch';
import {
    errorCheck,
    createSuccess,
    createLoading,
} from './util';
import { push } from 'react-router-redux';
import { Course } from '../reducers/courseReducer';
import { LessonSummary } from '../reducers/lessonSummaryReducer';
import { User } from '../reducers/sessionReducer';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const courseSuccess = createSuccess('COURSE');
const loading = createLoading('COURSE');
const successStudents = createSuccess('STUDENTS');
const loadingStudents = createLoading('STUDENTS');
const successAddStudent = createSuccess('ADD_STUDENT');
const loadingAddStudent = createLoading('ADD_STUDENT');

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

export function loadCourseStudents(id: number) {
    return (dispatch: any) => {
        dispatch(loadingStudents('load_course_students'));
        fetch(`/api/course/${id}/student`, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: User[]) => {
            dispatch(successStudents({
                type: 'load_course_students',
                students: res,
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

export function addStudent(id: number, email: string) {
    return (dispatch: any) => {
        dispatch(loadingAddStudent('add_student_to_course'));
        fetch(`/api/course/${id}/student`, {
            method: 'PATCH',
            headers,
            credentials: 'same-origin',
            body: JSON.stringify({email})
        })
        .then(errorCheck)
        .then((res: User[]) => {
            dispatch(successAddStudent({
                type: 'add_student_to_course',
                students: res,
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
