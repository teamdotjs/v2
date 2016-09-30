import * as React from 'react';

export interface LoginProps {
    onSubmit?: (u: String, p: String) => void;
    defaultUser?: String;
    defaultPass?: String;
}

export class LoginForm extends React.Component<LoginProps, {}> {
    _user: HTMLInputElement;
    _password: HTMLInputElement;

    render() {
        return (
            <form onSubmit={this.submit.bind(this)}>
                <input type='text' name='user'
                    placeholder='username'
                    ref = {(i) => this._user = i} />
                <br />
                <input type='password' name='password'
                    placeholder='password'
                    ref = {(i) => this._password = i}/>
                <input type='submit'/>
            </form>
        );
    }

    submit(ev: any) {
        debugger;
        const uname = this._user.value;
        const pass = this._password.value;
        this._user.value = this._password.value = '';
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(uname, pass);
        }
        ev.preventDefault();
        return false;
    }
}
export default LoginForm;