import 'whatwg-fetch';
import {
    errorCheck,
    throttle
} from './util';
import { push } from 'react-router-redux';
import { Lesson } from '../reducers/lessonReducer';
import { LessonSummary } from '../reducers/lessonSummaryReducer';

export interface CreateLessonPending {
    type: 'create_lesson_pending';
}

export interface CreateLessonSuccess {
    type: 'create_lesson_success';
    id: number;
}

export interface CreateLessonFailure {
    type: 'create_lesson_failure';
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function loadLessons() {
    return (dispatch: any) => {
        dispatch({
            type: 'load_lesson_summaries_pending'
        });
        fetch('/api/lesson', {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: LessonSummary[]) => {
            dispatch({
                type: 'load_lesson_summaries_success',
                lessonSummaries: res
            });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}

export function loadLesson(id: number) {
    return (dispatch: any) => {
        dispatch({
            type: 'load_lesson_pending'
        });
        fetch('/api/lesson/' + id, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Lesson) => {
            dispatch({
                type: 'save_lesson_local',
                lesson: res
            });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}

export function createLesson() {
    return (dispatch: any) => {
        dispatch({
            type: 'create_lesson_pending'
        });
        fetch('/api/lesson', {
            method: 'POST',
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Lesson) => {
            dispatch({
                type: 'create_lesson_success',
                lesson: res
            });
            dispatch(push('/lesson/' + res.id));
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}

export function saveLesson(l: Lesson) {

    return (dispatch: any) => {
        dispatch({
            type: 'save_lesson_local',
            lesson: l
        });

        throttle(() => {
            dispatch({
                type: 'save_lesson_pending'
            });
            fetch('/api/lesson/' + l.id, {
                method: 'PATCH',
                headers,
                credentials: 'same-origin',
                body: JSON.stringify({lesson: l})
            })
            .then(errorCheck)
            .then(( res: Lesson) => {
                dispatch({
                    type: 'save_lesson_success',
                    id: res.id
                });
            })
            .catch((err: Error) => {
                dispatch({
                    type: 'error_push',
                    error: err.message
                });
            });
        }, 5000);
    };
}

export function deleteLesson(id: number) {

    return (dispatch: any) => {
        dispatch({ type: 'lesson_delete', id });
        fetch(`/api/lesson/${id}`, {
            headers,
            credentials: 'same-origin',
            method: 'DELETE'
        })
        .then(errorCheck)
        .then(() => {
            dispatch({ type: 'lesson_delete_success', id });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}
