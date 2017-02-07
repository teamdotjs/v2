import * as React from 'react';
import WordCreator from './WordCreator/WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import {
    Practice, SectionType
} from '../../reducers/practiceReducer';
import {
    TextField,
} from 'material-ui';
import {
    PracticeView
} from './PracticeView';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    loadLession?: () => void;
    getPractice?: (id: number) => void;
    generatePractice: (type: SectionType) => void;
    value?: Lesson;
    notFound: boolean;
    practices?: Practice[];
}

export class LessonCreator extends BindingComponent<LessonCreatorProps> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = props.value || {
            'id': 0,
            'title': '',
            'wordinfos': [],
            'practices': props.practices
        };
    }

    componentWillReceiveProps(newProps: LessonCreatorProps) {
        this.setState(newProps.value || {
            'id': 0,
            'title': '',
            'wordinfos': [],
            'practices': this.state.practices
        });
    }

    get value(): Lesson {
        return {
            id: this.state['id'],
            title: this.state['title'],
            wordinfos: this.state['wordinfos'],
            'practices': this.state.practices
        };
    }

    componentWillMount() {
        if (this.props.notFound) {
            if (this.props.loadLession !== undefined) {
                this.props.loadLession();
            }
        }
    }

    componentStateChange() {
        if (this.props.onChange !== undefined) {
            this.props.onChange(this.value);
        }
    }

    getLoadingText(): string | undefined {
        if (this.props.practices !== undefined ) {
            return 'Your practice is generating';
        }
        return undefined;
    }

    render() {
        let content: any;
        if (this.props.notFound) {
            content = 'Lesson Not Found';
        } else {
            content = (
                <div style={{textAlign: 'left'}}>
                    <Page>
                        <TextField
                            style={{width: '100%'}}
                            inputStyle={{fontSize: '1.5em'}}
                            floatingLabelText='Lesson Title'
                            name='title'
                            value={this.state['title']}
                            onChange={this.bindValueToName.bind(this)}/>
                    </Page>
                    <Page title='Word Editor'>
                        <WordCreator
                            name='wordinfos'
                            value={this.state['wordinfos']}
                            onChange={this.updateState('wordinfos')}/>
                    </Page>
                    <PracticeView
                        /* FIX ME */
                        onPreviewPractice={() => {}}
                        onCreatePractice={this.props.generatePractice}
                        practices={this.props.practices || []} />
                </div>
            );
        }
        return  (
            <div>
                {content}
            </div>
        );
    }
}

export default LessonCreator;