import * as React from 'react';
import { QuestionView } from './QuestionView';
import {
    Question
} from '../../reducers/practiceReducer';
import { TextField } from 'material-ui';

export class ContextSentence extends QuestionView {

    highlightWord(sentence: string): JSX.Element {
        // Need to add a space after underscores or the following character is removed
        return <div>{sentence.replace('__________', '__________ ').split(' ').map(cur => {
            if (!cur.search('__________')) {
                return <TextField key={cur} name={cur} style={{width: '150px'}}/>;
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

    renderQuestion(): JSX.Element {
        const question: Question = this.props.question;
        return <div>
            <h4>Context Sentence</h4>
            {this.highlightWord(question.prompts[0])}
            {this.alterContext(question)}
        </div>;
    };

}
