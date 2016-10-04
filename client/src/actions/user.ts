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

interface LoginCheckResponse {
    logged_in: boolean;
}

interface LoginCheckResponse {
    logged_in: boolean;
    email: string;
}

function errorCheck(response: Response): any {
    switch (response.status) {
        case 401:
            throw new Error('Unauthorized');
        case 500:
            throw new Error('The server failed to response');
        default:
            return response.json();
    }
}

export function loginCheck(): any {
    return (dispatcher: any) => {
        fetch('/api/auth/signed_in', {
            credentials: 'same-origin'
        })
        .then((res: Response) => {
            return res.json();
        })
        .then((body: LoginCheckResponse) => {
            dispatcher(loginSuccess(body.email));
        });
    };
}

export function login(email: string, password: string): any {
    return (dispatcher: any) => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                email, password
            })
        })
        .then(errorCheck)
        .then((res: LoginCheckResponse) => {
            dispatcher(loginSuccess(res.email));
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


