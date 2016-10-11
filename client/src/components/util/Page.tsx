import * as React from 'react';
import Paper from 'material-ui/Paper';

const style = {
    margin: '0 auto',
    padding: '40px',
    textAlign: 'center',
    display: 'block',
    maxWidth: '400px'
};

export interface PageProps {
    children?: Element[];
}

const Page = (props: PageProps) => {
    return (
            <Paper style={style}>
            {props.children}
            </Paper>
    );
};

export default Page;