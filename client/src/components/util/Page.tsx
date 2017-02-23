import * as React from 'react';
import { Paper, Toolbar, ToolbarTitle } from 'material-ui';

const style = {
    padding: '40px',
    marginBottom: '40px'
};

export interface PageProps {
    children?: Element[];
    header?: string|JSX.Element;
    style?: React.CSSProperties;
}

const Page = (props: PageProps) => {
    let header: JSX.Element|undefined;
    if (props.header instanceof String) {
        header = <Toolbar><ToolbarTitle text={props.header} /></Toolbar>;
    } else {
        header = props.header;
    }
    return (<Paper>
                {header}
                <div style={{...style, ...props.style}}>
                    {props.children}
                </div>
            </Paper>
    );
};

export default Page;