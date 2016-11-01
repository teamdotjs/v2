import * as React from 'react';
import Paper from 'material-ui/Paper';

const style = {
    padding: '40px',
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