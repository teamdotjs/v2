import 'whatwg-fetch';
import { ErrorResponse } from '../reducers/errorReducer';
import { LoadingState } from '../reducers/loadingReducer';

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

export const createAction = (namespace: string) => (payload: any) => (dispatch: any) => {
    dispatch(payload);
    return dispatch({
        type: 'LOADING',
        namespace,
        isLoading: false,
        action: payload.type,
    });
};

export const createLoading = (namespace: string) => (action: string) => (dispatch: any) => {
    return dispatch({
        type: 'LOADING',
        namespace,
        isLoading: true,
        action,
    });
};

export function isLoading(namespace: string, state: LoadingState): boolean {
    if (state[namespace] === undefined) return false;
    return Object.keys(state[namespace]).map((key: string) => {
        return state[namespace][key];
    }).reduce((acc: boolean, cur: boolean) => acc || cur, false);
}
