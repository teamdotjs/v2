import * as React from 'react';
import WordCreator from './WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {
    TextField,
} from 'material-ui';

export interface LessonCreatorProps {
    isLoggedIn: boolean;
    children?: Element[];
}

export class LessonCreator extends BindingComponent<LessonCreatorProps> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = {
            'lessonTitle': '',
            'word_infos': []
        };
    }

    render() {
        return  (
            <Page>
                <TextField style={{fontWeight: 'bold', fontSize: '1.5em'}} hintText='Lesson Title' name='lessonTitle'
                                value={this.state['lessonTitle']}
                                onChange={this.bindValueToName.bind(this)}/>
                <h2>Words</h2>
                <WordCreator name='word_infos' value={this.state['word_infos']} onChange={this.updateState('word_infos', 'value')}/>
            </Page>
        );
    }
}

export default LessonCreator;