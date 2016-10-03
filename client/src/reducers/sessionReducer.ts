export interface SessionState {
    uname?: string;
}

export const sessionReducer = (state: SessionState, _action: any): SessionState => {
    if (state === undefined) {
        return {uname: undefined};
    }
    switch (_action.type) {
        case 'login':
            return {
                uname: _action.uname
            };
        default:
            return state;
    }
};