import {
    List,
    ListItem,
    Subheader,
} from 'material-ui';

import {LessonSummary} from '../reducers/lessonSummaryReducer';
import {Course} from '../reducers/courseReducer';
import Page from './util/Page';
import * as React from 'react';

export interface HomeProps {
    courses?: Course[];
    lessons?: LessonSummary[];
    loading?: boolean;
    onCreateLessonClick?: () => void;
    onClickCourse?: (id: number) => void;
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
            <List style={{textAlign: 'left'}}>
                <Subheader>My Courses </Subheader>
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
