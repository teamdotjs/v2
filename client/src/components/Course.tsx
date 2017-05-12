import * as React from 'react';
import Page from './util/Page';
import {Lesson} from '../reducers/lessonReducer';
import {
    List,
    ListItem,
    Subheader,
    FloatingActionButton,
    FlatButton
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

export interface CourseProps {
    is_instructor?: boolean;
    title?: string;
    lessons?: Lesson[];
    onClickLesson?: (id: number) => void;
    onCreateLessonClick: () => void;
    onClickGrades: () => void;
    onClickStudents: () => void;
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
                    <Page style={{marginTop: 0}}>
                        <div>
                            <h2 style={{display: 'inline-block'}}>{props.title}</h2>
                            {props.is_instructor
                                ? <FlatButton
                                    onClick={props.onClickStudents}
                                    primary={true}
                                    label='View Students' />
                                : undefined}
                            {props.is_instructor
                                ? <FlatButton
                                    onClick={props.onClickGrades}
                                    primary={true}
                                    label='View Grades' />
                                : undefined}
                        </div>
                        {props.is_instructor
                            ? <FloatingActionButton
                                mini={true}
                                style={{float: 'right'}}
                                label='New Lesson'
                                onClick={props.onCreateLessonClick}>
                                <ContentAdd />
                            </FloatingActionButton>
                        : undefined }

                        {content}
                    </Page>
        </div>;
};

export default Course;
