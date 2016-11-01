import {
    List,
    FloatingActionButton,
    ListItem,
    Subheader,
} from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import {
    Lesson
} from 'datatypes/lessonTypes';
import Page from './util/Page';
import * as React from 'react';

export interface HomeProps {
    lessons?: Lesson[];
    onCreateLessonClick?: () => void;
    onClickLesson?: (id: number) => void;
}

export const Home = (props: HomeProps) => {
    let lessons = (props.lessons || []).map((l) =>
        <ListItem onClick={
                () => props.onClickLesson ?
                    props.onClickLesson(l.id) :
                    undefined
            }
            key={l.id}
            primaryText={l.title} />
    );

    let content: any;
    if (lessons.length > 0) {
        content = (
            <List style={{textAlign: 'left'}}>
                <Subheader>My Lessons </Subheader>
                {lessons}
            </List>
        );
    } else {
        content = <Subheader>You currently have no lessons</Subheader>;
    }

    return (<Page>
        <FloatingActionButton mini={true} style={{float: 'right'}} label='New Lesson'
            onClick={props.onCreateLessonClick}>
                    <ContentAdd />
        </FloatingActionButton>
        {content}
    </Page>);
};

export default Home;