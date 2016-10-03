export interface LoginAction {
    type: 'login';
    uname: string;
}

export function login(uname: string): LoginAction {
    return {
        type: 'login',
        uname
    };
}

// TODO: Actually register. For now we just log in.
export function register (uname: string, _password: string): LoginAction {
    return login(uname);
}


