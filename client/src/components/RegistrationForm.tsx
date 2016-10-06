import * as React from 'react';
import BindingComponent from './util/BindingComponent';
import Page from './util/Page';
import {
    RaisedButton,
    TextField
} from 'material-ui';

export interface RegistrationProps {
    onSubmit?: (u: string, p: string) => void;
}

export class RegistrationForm extends BindingComponent<RegistrationProps> {
    constructor(_: RegistrationProps) {
        super();
        this.state = {
            user: '',
            password1: '',
            password2: '',
        };
    }

    render() {
        let error: any = null;
        if (this.state['password2'] !== '' && this.state['password1'] !== this.state['password2']) {
            error = 'Passwords do not match';
        }
        const submittable = error === null &&
                        this.state['password1'] !== '' &&
                        this.state['password2'] !== '';
        return (
            <Page>
            <form onSubmit={this.submit.bind(this)}>
                <TextField hintText='Username' name='user'
                            value={this.state['user']}
                            onChange={this.bindValue.bind(this)} />
                <br />

                <TextField hintText='Password' name='password1'
                            type='password' value={this.state['password1']}
                            onChange={this.bindValue.bind(this)}
                            errorText={error} />
                <br />

                <TextField hintText='Confirm Password' name='password2'
                            type='password' value={this.state['password2']}
                            onChange={this.bindValue.bind(this)}
                            errorText={error} />
                <br />
                <RaisedButton disabled={!submittable} type='submit' style={{marginTop: '20px'}} label='Register' />
            </form>
            </Page>
        );
    }

    submit(ev: Event) {
        const uname = this.state['user'];
        const pass = this.state['password'];
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
export default RegistrationForm;