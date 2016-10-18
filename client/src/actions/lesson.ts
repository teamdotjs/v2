import 'whatwg-fetch';
import {
    errorCheck,
    throttle
} from './util';
import { push } from 'react-router-redux';
import { Lesson } from '../reducers/lessonReducer';

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

interface LessonAPIResponse {
    id: number;
    title: string;
    wordinfos: any[];
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

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
        .then((res: LessonAPIResponse) => {
            dispatch({
                type: 'create_lesson_success',
                id: res.id
            });
            dispatch(push('/lesson/' + res.id));
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
                body: JSON.stringify(l)
            })
            .then(errorCheck)
            .then((_res: LessonAPIResponse) => {
                dispatch({
                    type: 'save_lesson_success',
                });
            });
        }, 1000);
    };
}
