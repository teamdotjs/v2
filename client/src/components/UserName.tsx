import * as React from 'react';

export interface UserNameProps {
    isLoggedIn: boolean;
    userName: string;
    error?: string;
}
const UserName = (props: UserNameProps) => {
    let name= <div> {props.userName} </div>;
    let noName = <div />;
    return (
        <div style={{marginTop: '6px'}}>
            {props.isLoggedIn ? name : noName }
        </div>
    );
};
export default UserName;