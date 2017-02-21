import 'whatwg-fetch';
import {
    errorCheck
} from './util';
import { SectionType } from '../reducers/practiceReducer';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function generatePractice(id: number, type: SectionType) {
    return (dispatch: any) => {
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
            dispatch({ type: 'practice_save_local', practice, id });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
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
