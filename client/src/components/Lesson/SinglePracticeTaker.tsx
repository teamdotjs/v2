import * as React from 'react';
import { Practice } from '../../reducers/practiceReducer';
import {
    QuestionView
} from '../Practice/QuestionView';
import {
    RaisedButton
} from 'material-ui';

export interface SinglePracticeTakerProps {
    practice: Practice;
    loading?: boolean;
}
export interface SinglePracticeTakerState {
    index: number;
}

// This elements state containts a number to indicate the index.
// Eventually this should be passed via params and controlled
// by a reducer.
export class SinglePracticeTaker extends React.Component<SinglePracticeTakerProps, SinglePracticeTakerState> {
    state: SinglePracticeTakerState;

    constructor(props: SinglePracticeTakerProps) {
        super(props);
        this.state = {index: -1};
    }

    render() {
        if (this.state.index == -1) {
            return <div style={{textAlign: 'center'}}>
                <RaisedButton label='Begin Practice' onClick={()=> this.setState({index: 0})}/>
                </div>
        }

        const q = this.props.practice.questions[this.state.index];

        return <div>
            <QuestionView question={q} />
            <RaisedButton label='Next' onClick={()=>this.setState({index: this.state.index+1})}/>
        </div>;
    }
};
export default SinglePracticeTaker;