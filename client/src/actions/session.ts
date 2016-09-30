export interface LoginAction {
    type: 'login';
    uname: String;
}

export function login(uname: String): LoginAction {
    return {
        type: 'login',
        uname
    };
}



