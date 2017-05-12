export interface SessionState {
    isLoggedIn: boolean;
    pending?: boolean;
    user?: User;
    error?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    birthday: Date;
}

export const sessionReducer = (state: SessionState, action: any): SessionState => {
    if (state === undefined) return {isLoggedIn: false};
    switch (action.type) {
        case 'login':
            return {
                pending: false,
                isLoggedIn: true,
                user: action.user,
            };
        case 'login_request':
            return {
                pending: true,
                isLoggedIn: state.isLoggedIn
            };
        case 'login_failure':
            return {
                pending: false,
                isLoggedIn: false,
                error: action.error
            };
        case 'logout':
            return{
                pending: false,
                isLoggedIn: false,
            };
        case 'logout_request':
            return{
                pending: true,
                isLoggedIn: state.isLoggedIn
            };
        case 'logout_failure':
            return{
                pending: false,
                isLoggedIn: true,
                error: action.error
            };
        default:
            return state;
    }
};