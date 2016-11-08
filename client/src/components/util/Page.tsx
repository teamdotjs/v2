import * as React from 'react';
import { Paper, Toolbar, ToolbarTitle } from 'material-ui';

const style = {
    padding: '40px',
    marginBottom: '40px'
};

export interface PageProps {
    children?: Element[];
    title?: string;
}

const Page = (props: PageProps) => {
    const header = props.title !== undefined ? <Toolbar><ToolbarTitle text={props.title} /></Toolbar> : undefined;
    return (<Paper>
                {header}
                <div style={style}>
                    {props.children}
                </div>
            </Paper>
    );
};

export default Page;