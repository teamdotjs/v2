export function pushError(error: string) {
    return (dispatch: any) => {
        return dispatch({
            type: 'error_push',
            error
        });
    };
}

export function clearErrors() {
    return (dispatch: any) => {
        return dispatch({
            type: 'error_clear'
        });
    };
}
