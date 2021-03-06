import 'whatwg-fetch';
import {
    errorCheck,
    createSuccess,
    createLoading,
} from './util';
import { SectionType } from '../reducers/practiceReducer';
import { PRACTICE_ERROR } from '../reducers/errorReducer';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const success = createSuccess('PRACTICE');
const loading = createLoading('PRACTICE');

export function generatePractice(id: number, type: SectionType) {
    return (dispatch: any) => {
        dispatch({
            type: 'error_pin',
            pin: PRACTICE_ERROR,
        });
        dispatch(loading('practice_save_local'));
        dispatch({ type: 'practice_generate', id });
        fetch(`/api/lesson/${id}/practice`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({type})
        })
        .then(errorCheck)
        .then((practice: JSON) => {
            dispatch(success({ type: 'practice_save_local', practice, id }));
        })
        .catch((err: Error) => {
            console.log(err);
            dispatch({
                type: 'error_pin',
                pin: PRACTICE_ERROR,
                error: err.message
            });
        });
    };
}

export function loadPractice(id: number) {
    return (dispatch: any) => {
        dispatch({ type: 'practice_load', id});
        fetch(`/api/lesson/${id}/practice`, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((practices: JSON) => {
            dispatch({ type: 'practice_load_success', practices });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}

export function deletePractice(id: number) {
    return (dispatch: any) => {
        dispatch({ type: 'practice_delete', id});
        fetch(`/api/practice/${id}`, {
            headers,
            credentials: 'same-origin',
            method: 'DELETE'
        })
        .then(errorCheck)
        .then(() => {
            dispatch({ type: 'practice_delete_success', id });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}
