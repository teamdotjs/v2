import * as React from 'react';
import WordCreator from './WordCreator/WordCreator';
import Page from '../util/Page';
import {Lesson} from '../../reducers/lessonReducer';
import {
    FlatButton, Toolbar, ToolbarTitle, ToolbarGroup, LinearProgress
} from 'material-ui';

export interface StudyProps {
    lesson: Lesson;
    loading: boolean;
    onClickEdit: () => void;
    userId: number;
}

export const Study = (props: StudyProps) => {
    let content: any;

    if (props.loading && props.lesson === undefined) {
        content = <LinearProgress />;
    } else if (props.lesson === undefined) {
        content = 'Lesson Not Found';
    } else {
        content = (
            <div style={{marginTop: '40px'}}>
                <Page
                    style={{paddingTop: 0}}
                    header={
                        <div>
                            <Toolbar>
                                <ToolbarTitle text={props.lesson.title}/>
                                {props.lesson.owner_id === props.userId
                                    ? <ToolbarGroup>
                                        <FlatButton
                                            onClick={props.onClickEdit}
                                            style={{marginRight: 0}}
                                            secondary={true}
                                            label='Edit' />
                                    </ToolbarGroup>
                                    : undefined}
                            </Toolbar>
                        </div>
                    }>
                    <WordCreator
                        name='wordinfos'
                        disabled={true}
                        value={props.lesson.wordinfos} />
                </Page>
            </div>
        );
    }
    return  (
        <div>
            {content}
        </div>
    );
};

export default Study;
