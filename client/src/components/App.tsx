import * as React from 'react';
import AppBar from 'material-ui/AppBar';
export interface AppProps {
    children?: Element[];
}

const App = (props: AppProps) => {
    return (
        <div style={{position: 'absolute', width: '100%', margin: 0}}>
        <AppBar
                    title='NTID Vocab Program'
                    iconClassNameRight='muidocs-icon-navigation-expand-more'/>
            {props.children}
        </div>
    );
};

export default App;