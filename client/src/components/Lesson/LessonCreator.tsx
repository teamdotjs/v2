import * as React from 'react';
import WordCreator from './WordCreator/WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import {
    Practice, SectionType
} from '../../reducers/practiceReducer';
import {
    TextField, Toolbar, ToolbarTitle
} from 'material-ui';
import {
    PracticeView
} from './PracticeView';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    loadLesson?: () => void;
    getPractice?: (id: number) => void;
    generatePractice: (type: SectionType) => void;
    deletePractice: (id: number) => void;
    value?: Lesson;
    notFound: boolean;
    practices?: Practice[];
}

const disabledMessageStyle = {
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    background: '#ff4081'
};

export class LessonCreator extends BindingComponent<LessonCreatorProps, Lesson> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = props.value || {
            id: 0,
            title: '',
            wordinfos: [],
            practices: []
        };
    }

    componentWillReceiveProps(newProps: LessonCreatorProps) {
        this.setState(newProps.value || {
            id: 0,
            title: '',
            wordinfos: [],
            practices: []
        });
    }

    get value(): Lesson {
        return this.state;
    }

    componentWillMount() {
        if (this.props.notFound) {
            if (this.props.loadLesson !== undefined) {
                this.props.loadLesson();
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
        const hasPractices = this.props.practices ? this.props.practices.length > 0 : false;
        const disabledMessage = hasPractices ?
            <div style={disabledMessageStyle}> You cannot edit words while practices exist</div> : undefined;

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
                            value={this.state.title}
                            onChange={this.bindValueToName.bind(this)}/>
                    </Page>
                    <Page
                        style={{paddingTop: 0}}
                        header={
                        <div>
                            <Toolbar><ToolbarTitle text='Word Editor'/></Toolbar>
                            {disabledMessage}
                        </div>
                    }>
                        <WordCreator
                            name='wordinfos'
                            disabled={hasPractices}
                            value={this.state.wordinfos}
                            onChange={this.updateState('wordinfos')}/>
                    </Page>
                    <PracticeView
                        /* FIX ME */
                        onPreviewPractice={() => {}}
                        onCreatePractice={this.props.generatePractice}
                        onRemovePractice={this.props.deletePractice}
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
