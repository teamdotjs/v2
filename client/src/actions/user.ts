import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { errorCheck } from './util';
import { User } from '../reducers/sessionReducer';

export interface LoginActionPending {
    type: 'login_request';
}

export interface LoginActionSuccess {
    type: 'login';
    user: User;
}

export interface LoginActionFailure {
    type: 'login_failure';
    error: string;
}

export interface LogoutActionSuccess {
    type: 'logout';
}

export interface LogoutActionFailure {
    type: 'logout_failure';
    error: string;
}

export interface LogoutActionPending {
    type: 'logout_request';
}

export interface RegisterFailure {
    type: 'register_failure';
    errors: string[];
}

export interface RegisterSuccess {
    type: 'register_success';
}

interface LoginCheckResponse {
    logged_in: boolean;
    user: User;
}

interface LogoutCheckResponse {
    logged_in: boolean;
}

interface RegisterResponse {
    errors: string[];
}

export function loginCheck(): any {
    return (dispatch: any) => {
        fetch('/api/auth/signed_in', {
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((body: LoginCheckResponse) => {
            dispatch(loginSuccess(body));
        })
        .catch(() => {
            dispatch({
                type: 'login_failure',
                errors: []
            });
        });

        return dispatch({
            type: 'login_request'
        });
    };
}

export function login(email: string, password: string): any {
    return (dispatch: any) => {
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
            dispatch(loginSuccess(res));
        })
        .catch((err: Error) => {
            dispatch(loginFailure(err.message));
        });

        return dispatch({
            type: 'login_request'
        });
    };
}

export function loginSuccess(res: LoginCheckResponse): LoginActionSuccess {
    return {
        type: 'login',
        user: res.user,
    };
}

export function loginFailure(error: string): LoginActionFailure {
    return {
        type: 'login_failure',
        error
    };
}
export function logoutCheck(): any {
    return (dispatch: any) => {
        fetch('/api/auth/signed_in', {
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((_body: LogoutCheckResponse) => {
            dispatch(logoutSuccess());
        })
        .catch(() => {
            dispatch({
                type: 'logout_failure',
                errors: []
            });
        });

        return dispatch({
            type: 'logout_request'
        });
    };
}

export function logout(): any {
    return(dispatch: any) => {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((_res: LogoutCheckResponse) => {
            window.location.href = '/';
        })
        .catch((err: Error) => {
            dispatch(logoutFailure(err.message));
        });
        return dispatch({
            type: 'logout_request'
        });
    };
}

export function logoutSuccess(): LogoutActionSuccess {
    return{
        type: 'logout'
    };
}

export function logoutFailure(error: string): LogoutActionFailure {
    return{
        type: 'logout_failure',
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
        type: 'register_success'
    };
}


export function register(name: string, password: string, email: string, birthday: string): any {
    return (dispatch: any) => {
        const bvalue = birthday.split('/');
        const bday = new Date(
            parseInt(bvalue[2]),
            parseInt(bvalue[1]),
            parseInt(bvalue[0])
        );
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name, email, password, birthday: bday.toISOString()
                }
            })
        })
        .then(errorCheck)
        .then((_res: RegisterResponse) => {
            dispatch(registerSuccess());
            dispatch(login(email, password));
            dispatch(push('/'));
        })
        .catch((error: Error) => {
            dispatch(registerFailure([error.message]));
        });

        return dispatch({
            type: 'register_request'
        });
    };
}


