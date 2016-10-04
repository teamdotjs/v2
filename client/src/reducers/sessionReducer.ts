export interface SessionState {
    uname?: string;
    pending?: boolean;
    error?: string;
}

export const sessionReducer = (state: SessionState, _action: any): SessionState => {
    if (state === undefined) {
        return {
            uname: undefined,
            pending: false
        };
    }
    switch (_action.type) {
        case 'login':
            return {
                pending: false,
                uname: _action.uname
            };
        case 'login_request':
            return {
                pending: true
            };
        case 'login_failure':
            return {
                pending: false,
                error: _action.error
            };
        default:
            return state;
    }
};