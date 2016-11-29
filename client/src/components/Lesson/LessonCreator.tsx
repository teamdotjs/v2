import * as React from 'react';
import WordCreator from './WordCreator/WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import { Practice } from '../../reducers/practiceReducer';
import {
    TextField,
    RaisedButton,
    LinearProgress
} from 'material-ui';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    loadLession?: () => void;
    getPractice?: (id: number) => void;
    value?: Lesson;
    notFound: boolean;
    practice?: Practice;
}

export class LessonCreator extends BindingComponent<LessonCreatorProps> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = props.value || {
            'id': 0,
            'title': '',
            'wordinfos': []
        };
    }

    componentWillReceiveProps(newProps: LessonCreatorProps) {
        this.setState(newProps.value || {
            'id': 0,
            'title': '',
            'wordinfos': []
        });
    }

    get value(): Lesson {
        return {
            id: this.state['id'],
            title: this.state['title'],
            wordinfos: this.state['wordinfos'],
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
        if (this.props.practice !== undefined ) {
            if (this.props.practice.isGenerating) {
                return 'Your practice is generating';
            } else if (this.props.practice.loading) {
                return 'Loading';
            }
        }
        return undefined;
    }

    _renderPractice(): JSX.Element {
        if (this.props.practice !== undefined) {
            const message = this.getLoadingText();
            if (message !== undefined) {
                return <div>
                    <h4 style={{
                            textAlign: 'center',
                            marginTop: '0px'
                        }}>{message}</h4>
                    <LinearProgress />
                </div>;
            } else {
                return <div>Done</div>;
            }
        } else {
            return <RaisedButton
                label='Generate Practice Questions'
                secondary={true}
                fullWidth={true}
                onClick={() => {
                    if (this.props.getPractice !== undefined) {
                        this.props.getPractice(this.state['id']);
                    }
                }} />;
        }
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
                    <Page title='Practice'>
                        {this._renderPractice()}
                    </Page>
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