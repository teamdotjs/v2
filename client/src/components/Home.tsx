import {RaisedButton} from 'material-ui';
import Page from './util/Page';
import * as React from 'react';
import { browserHistory } from 'react-router';


export const Home = (_: any) => {
    return (<Page>
        <RaisedButton primary={true} label='New Lesson'
            onClick={() => browserHistory.push('/lesson/1')}/>
    </Page>);
};

export default Home;