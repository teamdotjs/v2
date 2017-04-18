import * as React from 'react';
import Page from './util/Page';
import {Lesson} from '../reducers/lessonReducer';
import {
    List,
    ListItem,
    Subheader,
    FloatingActionButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

export interface CourseProps {
    title?: string;
    lessons?: Lesson[];
    onClickLesson?: (id: number) => void;
    onCreateLessonClick: () => void;
    loading?: boolean;
}

export const Course = (props: CourseProps) => {
    const lessons = (props.lessons || []).map((l) =>
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
                <Subheader>Lessons</Subheader>
                {lessons}
            </List>
        );
    } else {
        content = <Subheader>You currently have no lessons</Subheader>;
    }

    if (props.loading) {
        content = <Subheader>Loading...</Subheader>;
    }
    return  <div style={{textAlign: 'left'}}>
                    <Page
                        style={{marginTop: 0}}
                        >
                                                <h2>{props.title}</h2>

                    <FloatingActionButton mini={true} style={{float: 'right'}} label='New Lesson'
                                          onClick={props.onCreateLessonClick}>
                        <ContentAdd />
                    </FloatingActionButton>
                        {content}
                    </Page>
        </div>;
};

export default Course;
