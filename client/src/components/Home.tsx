import {
    List,
    ListItem,
    Subheader,
    FloatingActionButton,
} from 'material-ui';

import { Course } from '../reducers/courseReducer';
import Page from './util/Page';
import * as React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';

export interface HomeProps {
    courses?: Course[];
    loading?: boolean;
    onClickCourse?: (id: number) => void;
    onCreateCourseClick?: () => void;
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
                <Subheader>My Courses
                    <FloatingActionButton
                            mini={true}
                            style={{ float: 'right' }}
                            label='New Lesson'
                            onClick={
                                () => props.onCreateCourseClick ?
                                    props.onCreateCourseClick() :
                                    undefined
                            }>
                            <ContentAdd />
                        </FloatingActionButton>
                </Subheader>
                {courses}
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
