import 'whatwg-fetch';
import { ErrorResponse } from '../reducers/errorReducer';

export function errorCheck(response: Response): any {
    return response.json()
        .then((body: JSON) => {
            if (response.ok) {
                return body;
            } else {
                const error = body as ErrorResponse;
                throw new Error(error.error_message);
            }
        });
}

let pending: boolean = false;
let execution: () => void = () => {};
export function throttle(fn: () => void, threshhold: number) {
    execution = fn;
    if (!pending) {
        pending = true;
        setTimeout(() => {
            execution();
            pending = false;
        }, threshhold);
    }
}
