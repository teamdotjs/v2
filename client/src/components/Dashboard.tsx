import * as React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';

export interface DashboardProps {
    isLoggedIn: boolean;
    children?: Element[];
}

export class Dashboard extends React.Component<DashboardProps, {}> {

    render() {
        const loginForm = this.props.isLoggedIn ? null : <LoginFormContainer />;
        return  (
            <div>
            {loginForm}
            {this.props.children}
            </div>
        );
    }
}

export default Dashboard;