import {RaisedButton} from 'material-ui';
import Page from './util/Page';
import * as React from 'react';

export interface HomeProps {
    onCreateLessonClick?: () => void;
}

export const Home = (props: HomeProps) => {
    return (<Page>
        <RaisedButton primary={true} label='New Lesson'
            onClick={props.onCreateLessonClick}/>
    </Page>);
};

export default Home;