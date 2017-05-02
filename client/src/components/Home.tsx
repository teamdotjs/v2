import {
    List,
    ListItem,
    Subheader,
    FlatButton,
} from 'material-ui';

import { Course } from '../reducers/courseReducer';
import Page from './util/Page';
import * as React from 'react';

export interface HomeProps {
    courses?: Course[];
    loading?: boolean;
    onClickCourse?: (id: number) => void;
    onCreateCourseClick?: () => void;
    inputText?: string;
}

export const Home = (props: HomeProps) => {
    const courses = (props.courses || []).map((c) =>
        <ListItem onClick={
            () => props.onClickCourse ?
                props.onClickCourse(c.id) :
                undefined
        }
            key={c.id}
            primaryText={c.title} />
    );

    let content: any;
    if (courses.length > 0) {
        content = (
            <List style={{ textAlign: 'left' }}>
                <Subheader>My Courses </Subheader>
                {courses}
                <FlatButton style={{ float: 'left', backgroundColor: 'lightgray' }} label='New Course'
                    onClick={
                        () => props.onCreateCourseClick ?
                            props.onCreateCourseClick() :
                            undefined
                    }>
                </FlatButton>
            </List>
        );
    } else {
        content = <Subheader>You currently have no courses</Subheader>;
    }

    if (props.loading) {
        content = <Subheader>Loading...</Subheader>;
    }

    return (<Page>
        {content}
    </Page>);
};

export default Home;
