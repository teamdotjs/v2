import * as React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import DrawerContainer from '../containers/DrawerContainer';
import LogoutContainer from '../containers/LogoutContainer';
import ErrorContainer from '../containers/ErrorContainer';
import { toggleDrawer } from '../actions/drawer';

import store from '../store/exampleStore';

export interface AppProps {
    children?: Element[];
}

const App = (props: AppProps) => {
    let title = <Link style={{color: 'white', textDecoration: 'none'}} to='/'>NTID Vocab</Link>;
    return (
        <div style={{position: 'absolute', width: '100%', margin: 0}}>
            <ErrorContainer />
            <DrawerContainer />
            <AppBar
                title={title}
                iconElementRight= { <LogoutContainer /> }
                onLeftIconButtonTouchTap={() => store.dispatch(toggleDrawer()) }
                />
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                {props.children}
            </div>
        </div>
    );
};

export default App;