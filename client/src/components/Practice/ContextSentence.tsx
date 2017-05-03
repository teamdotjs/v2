import * as React from 'react';
import {
    Question
} from '../../reducers/practiceReducer';
import { TextField } from 'material-ui';

import {QuestionViewProps} from './QuestionView';

interface FITBState {
    value: string;
};

export class ContextSentence extends React.Component<QuestionViewProps, FITBState> {

    constructor(props: QuestionViewProps) {
        super(props);
        this.state = {value: (props.value || '') as string};
    }

    onChange() {
        if (this.props.onChange) this.props.onChange(this.state.value, this.props.question.id);
    }

    highlightWord(sentence: string): JSX.Element {
        return <div>{sentence.split(' ').map(cur => {
            // 10 underscores are used to represent the word
            // search returns position of string found, -1 if not found
            if (cur.search('__________') !== -1) {
                return <span>
                    <TextField
                        key={this.props.question.id}
                        value={this.state.value}
                        name={cur}
                        style={{width: '150px'}}
                        onChange={ (_: any, value: string) => this.setState({value}) }
                        onBlur={ () => this.onChange() }
                    />
                </span>;
            } else {
                return cur + ' ';
            }
        })}</div>;
    }

    alterContext(question: Question): JSX.Element {
        const header = question.prompts.length > 1 ? <h5>Alternative contexts</h5> : undefined;
        return <div>
            {header}
            <ul>
                {question.prompts.slice(1).map((prmt) => {
                    return <li key={prmt}>{this.highlightWord(prmt)}</li>;
                })}
            </ul>
        </div>;
    }

    render(): JSX.Element {
        const question: Question = this.props.question;
        return <div>
            <h4>Context Sentence</h4>
            {this.highlightWord(question.prompts[0])}
            {this.alterContext(question)}
        </div>;
    };

}
