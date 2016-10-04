import * as React from 'react';
import BindingComponent from '../BindingComponent';
import {Link} from 'react-router';

import {
    RaisedButton,
    TextField,
    CircularProgress
} from 'material-ui';

export interface LoginProps {
    onSubmit?: (u: String, p: String) => void;
    lock?: boolean;
    error?: string;
}

export class LoginForm extends BindingComponent<LoginProps> {
    constructor(_: LoginProps) {
        super();
        this.state = {
            user: '',
            password: ''
        };
    }

    render() {
        const buttons = <div>
            <RaisedButton type='submit' style={{marginTop: '20px'}} label='Login' />
            <br /> <br />
            <Link to='/register'>Register</Link>
        </div>;

        const spinner = <div>
            <br />
            <CircularProgress />
        </div>;

        return (
            <form onSubmit={this.submit.bind(this)}>
                <TextField hintText='Username' name='user'
                            value={this.state['user']}
                            onChange={this.bindValue.bind(this)}
                            disabled={this.props.lock} />
                <br />
                <TextField hintText='Password' name='password'
                            type='password' value={this.state['password']}
                            onChange={this.bindValue.bind(this)}
                            disabled={this.props.lock} />
                <br />
                <div style={{
                    color: 'red'
                }}>
                    {this.props.error}
                </div>
                {this.props.lock ? spinner : buttons}
            </form>
        );
    }

    submit(ev: Event) {
        const uname = this.state['user'];
        const pass = this.state['password'];
        // this.setState({
        //     user: '',
        //     password: ''
        // });
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(uname, pass);
        }
        ev.preventDefault();
        return false;
    }
}
export default LoginForm;