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

export interface RegisterFailure {
    type: 'register_failure';
    errors: string[];
}

export interface RegisterSuccess {
    type: 'register_success';
    next: string;
}

interface LoginCheckResponse {
    logged_in: boolean;
}

interface LoginCheckResponse {
    logged_in: boolean;
    email: string;
}

interface RegisterResponse {
    errors: string[];
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

        return dispatcher({
            type: 'login_request'
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

export function registerFailure(errors: string[]): RegisterFailure {
    return {
        type: 'register_failure',
        errors
    };
}

export function registerSuccess(): RegisterSuccess {
    return {
        type: 'register_success',
        next: '/'
    };
}


export function register(name: string, password: string, email: string, _birthday: string): any {
    return (dispatcher: any) => {
        fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name, email, password
                }
            })
        })
        .then(errorCheck)
        .then((res: RegisterResponse) => {
            if (res.errors && res.errors.length > 0) {
                dispatcher(registerFailure(res.errors));
            } else {
                dispatcher(registerSuccess());
                dispatcher(login(email, password));
            }
        });

        return dispatcher({
            type: 'register_request'
        });
    };
}


