import * as React from 'react';

import {
    FlatButton
} from 'material-ui';

export interface LogoutProps {
    isLoggedIn: boolean;
    userName?: string;
    onLogoutClick?: () => void;
    error?: string;
}
const Logout = (props: LogoutProps) => {
    let buttons = <FlatButton onClick={props.onLogoutClick}
        style={{ color: 'white'}}
        label='Logout' />;
    let name = <div> {props.userName} </div>;
    let notButtons = <div />;
    return (
        <div style={{marginTop: '6px'}}>
            {props.isLoggedIn ? {name, buttons} : notButtons }
        </div>
    );
};
export default Logout;