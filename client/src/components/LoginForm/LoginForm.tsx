import * as React from 'react';
import {
    RaisedButton,
    TextField
} from 'material-ui';

export interface LoginProps {
    onSubmit?: (u: String, p: String) => void;
    defaultUser?: String;
    defaultPass?: String;
}

interface LoginState {
    user: string;
    password: string;
}

export class LoginForm extends React.Component<LoginProps, LoginState> {
    _unameField: TextField;
    _passField: TextField;

    constructor(_: LoginProps) {
        super();
        this.state = {
            user: '',
            password: ''
        };
    }

    handleTextChange(): void {
        this.setState({
            user: this._unameField.getValue(),
            password: this._passField.getValue()
        });
    }

    render() {
        return (
            <form onSubmit={this.submit.bind(this)}>
                <TextField hintText='Username' value={this.state.user} ref={(e: any) => this._unameField = e} onChange={this.handleTextChange.bind(this)} />
                <br />
                <TextField hintText='Password' type='password' value={this.state.password} ref={(e: any) => this._passField = e} onChange={this.handleTextChange.bind(this)} />
                <br />
                <RaisedButton type='submit' style={{marginTop: '20px'}} label='Login' />
            </form>
        );
    }

    submit(ev: Event) {
        const uname = this._unameField.getValue();
        const pass = this._passField.getValue();
        this.setState({
            user: '',
            password: ''
        });
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(uname, pass);
        }
        ev.preventDefault();
        return false;
    }
}
export default LoginForm;