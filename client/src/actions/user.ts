import 'whatwg-fetch';

export interface LoginActionPending {
    type: 'login_request';
}

export interface LoginActionSuccess {
    type: 'login';
    uname: string;
}

export interface LoginActionFailure {
    type: 'login_failure';
    error: string;
}

function errorCheck(response: Response): any {
    switch (response.status) {
        case 401:
            throw new Error('Unauthorized');
        default:
            return response.json();
    }
}

export function login(email: string, password: string): any {
    return (dispatcher: any) => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        .then(errorCheck)
        .then((_: JSON) => {
            dispatcher(loginSuccess(email));
        })
        .catch((err: Error) => {
            dispatcher(loginFailure(err.message));
        });

        return dispatcher({
            type: 'login_request'
        });
    };
}

export function loginSuccess(uname: string): LoginActionSuccess {
    return {
        type: 'login',
        uname
    };
}

export function loginFailure(error: string): LoginActionFailure {
    return {
        type: 'login_failure',
        error
    };
}

// TODO: Actually register. For now we just log in.
export function register (uname: string, password: string): LoginActionPending {
    return login(uname, password);
}


