import * as React from 'react';

import {
    FlatButton
} from 'material-ui';

export interface AppBarRightProps {
    isLoggedIn: boolean;
    userName?: string;
    onLogoutClick?: () => void;
    error?: string;
}
const AppBarRight = (props: AppBarRightProps) => {
    let buttons = <FlatButton onClick={props.onLogoutClick}
        style={{ color: 'white', float:'right'}}
        label='Logout' />;
    let name = <div style= {{ color: 'white', float: 'left', marginTop: '7px'}}> {props.userName} |</div>;
    let right = <div> {name}  {buttons} </div>;
    let notButtons = <div />;
    return (
        <div style={{marginTop: '6px'}}>
            {props.isLoggedIn ? right : notButtons }
        </div>
    );
};
export default AppBarRight;