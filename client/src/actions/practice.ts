import 'whatwg-fetch';
import {
    errorCheck
} from './util';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function generatePractice(id: number) {
    return (dispatch: any) => {
        dispatch({ type: 'practice_generate', id });
        fetch(`/api/lesson/${id}/practice`, {
            method: 'POST',
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((practices: JSON) => {
            dispatch({ type: 'practice_save_local', practices, id });
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
            dispatch({ type: 'practice_save_local', practices, id });
        })
        .catch((err: Error) => {
            dispatch({
                type: 'error_push',
                error: err.message
            });
        });
    };
}
