import * as React from 'react';
import WordCreator from './WordCreator/WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import {
    Practice, SectionType
} from '../../reducers/practiceReducer';
import { PRACTICE_ERROR } from '../../reducers/errorReducer';
import {
    TextField, Toolbar, ToolbarTitle, LinearProgress
} from 'material-ui';
import {
    PracticeView
} from './PracticeView';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    onLoad: () => void;
    generatePractice: (type: SectionType) => void;
    deletePractice: (id: number) => void;
    value?: Lesson;
    practices?: Practice[];
    errors: {
        [id: string]: string;
    };
    loading: boolean;
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
            owner_id: 0,
            wordinfos: [],
            practices: []
        };
    }

    componentWillReceiveProps(newProps: LessonCreatorProps) {
        this.setState(newProps.value || {
            id: 0,
            title: '',
            owner_id: 0,
            wordinfos: [],
            practices: []
        });
    }

    componentWillMount() {
        this.props.onLoad();
    }

    get value(): Lesson {
        return this.state;
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

        if (this.props.loading && this.props.value === undefined) {
            content = <LinearProgress />;
        } else if (this.props.value === undefined) {
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
                        practices={this.props.practices || []}
                        errorMessage={this.props.errors[PRACTICE_ERROR]} />
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
