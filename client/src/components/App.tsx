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

const App = () =>
    <div style={{position: 'absolute', width: '100%'}}>
        <Paper style={style}>
            <LoginFormContainer />
        </Paper>
    </div>;

export default App;