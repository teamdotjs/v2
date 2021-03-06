import * as React from 'react';
import { Practice } from '../../reducers/practiceReducer';
import {
    QuestionView
} from '../Practice/QuestionView';
import {
    RaisedButton
} from 'material-ui';

export interface SinglePracticeTakerProps {
    practice?: Practice;
    onLoad?: () => void;
    loading?: boolean;
    updateQuestion?: (newValue: any, id: number) => void;
    complete?: () => void;
    responses: { [id: number]: string | number };
}
export interface SinglePracticeTakerState {
    index: number;
}

const style = {
    nextButton: {
        float: 'right',
    },
    progress: {
        color: 'darkgrey',
    },
    container: {
        paddingBottom: '15px',
    },
};

// This elements state containts a number to indicate the index.
// Eventually this should be passed via params and controlled
// by a reducer.
export class SinglePracticeTaker extends React.Component<SinglePracticeTakerProps, SinglePracticeTakerState> {
    state: SinglePracticeTakerState;

    constructor(props: SinglePracticeTakerProps) {
        super(props);
        this.state = { index: -1 };
    }

    componentWillMount() {
        if (this.props.onLoad) this.props.onLoad();
    }

    continueAction() {
        if (this.state.index + 1 !== this.props.practice!.questions.length) {
            return <RaisedButton label='Next' style={style.nextButton} onClick={() => this.setState({ index: this.state.index + 1 })} />;
        } else {
            return <RaisedButton label='Finish' style={style.nextButton} onClick={() => this.submitPractice()} />;
        }
    }

    submitPractice() {
        if (this.props.complete) this.props.complete();
    }

    onValueChange(newValue: any, id: number) {
        if (this.props.updateQuestion) this.props.updateQuestion(newValue, id);
    }

    render() {
        if (this.props.practice === undefined) {
            return <div>Problem loading practice</div>;
        }

        if (this.state.index === -1) {
            return <div style={{ textAlign: 'center' }}>
                <RaisedButton label='Begin Practice' onClick={() => this.setState({ index: 0 })} />
            </div>;
        }

        const total = this.props.practice.questions.length;
        const q = this.props.practice.questions[this.state.index];

        return <div style={style.container} key={q.id + '' + this.props.practice.id} >
            <QuestionView question={q} value={this.props.responses[q.id]} onChange={this.onValueChange.bind(this)} />
            <div style={style.progress} >{this.state.index + 1}/{total}</div>
            {this.continueAction()}
        </div>;
    }
};
export default SinglePracticeTaker;