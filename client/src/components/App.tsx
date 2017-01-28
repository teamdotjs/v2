import * as React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import ErrorContainer from '../containers/ErrorContainer';
export interface AppProps {
    children?: Element[];
}

const App = (props: AppProps) => {
    let title = <Link style={{color: 'white', textDecoration: 'none'}} to='/'>NTID Vocab</Link>;
    return (
        <div style={{position: 'absolute', width: '100%', margin: 0}}>
            <ErrorContainer />
            <AppBar
                title={title}
                iconClassNameRight='muidocs-icon-navigation-expand-more'/>
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                {props.children}
            </div>
        </div>
    );
};

export default App;