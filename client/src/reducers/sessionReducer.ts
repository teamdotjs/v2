export interface SessionState {
    uname?: string;
    pending?: boolean;
    error?: string;
}

export const sessionReducer = (state: SessionState, action: any): SessionState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'login':
            return {
                pending: false,
                uname: action.uname
            };
        case 'login_request':
            return {
                pending: true
            };
        case 'login_failure':
            return {
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
};