import * as React from 'react';

import {
    FlatButton
} from 'material-ui';

export interface LogoutProps {
    isLoggedIn: boolean;
    onLogoutClick?: () => void;
    error?: string;
}
const Logout = (props: LogoutProps) => {
    let buttons = <FlatButton onClick={props.onLogoutClick}
        style={{ color: 'white'}}
        label='Logout' />;
    let notButtons = <div />;
    return (
        <div style={{marginTop: '6px'}}>
            {props.isLoggedIn ?  buttons : notButtons }
        </div>
    );
};
export default Logout;