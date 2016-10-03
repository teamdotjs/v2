import * as React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import Paper from 'material-ui/Paper';

const style = {
    margin: '0 auto',
    padding: '40px',
    textAlign: 'center',
    display: 'block',
    maxWidth: '400px'
};

export interface AppProps {
    isLoggedIn: boolean;
}

const App = (props: AppProps) => {
    let contents: any;
    if (!props.isLoggedIn) {
        contents = <LoginFormContainer />;
    } else {
        contents = 'You are currently logged in';
    }
    return (
        <div style={{position: 'absolute', width: '100%', margin: 0}}>
            <Paper style={style}>
                {contents}
            </Paper>
        </div>
    );
};

export default App;