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
        .then((res: JSON) => {
            console.log(res);
            let practice = {
                id
            };
            dispatch({ type: 'practice_save_local', practice });
        })
        .catch(
            (error: Error) =>
                dispatch({ type: 'practice_save_error', id, error })
        );
    };
}
