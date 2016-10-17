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

export function createLesson() {
    return (dispatch: any) => {
        dispatch({
            type: 'create_lesson_pending'
        });
        setTimeout(() => {
            dispatch({
                type: 'create_lesson_success',
                id: 1
            });

            dispatch(push('/lesson/1'));
        }, 100);
    };
}

export function saveLesson(l: Lesson) {
    return (dispatch: any) => {
        dispatch({
            type: 'save_lesson_local',
            lesson: l
        });

        dispatch({
            type: 'save_lesson_pending'
        });

        setTimeout(() => {
            dispatch({
                type: 'save_lesson_success',
            });
        }, 100);
    };
}