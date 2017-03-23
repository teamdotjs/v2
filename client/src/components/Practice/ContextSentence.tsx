import * as React from 'react';
import {
    Question
} from '../../reducers/practiceReducer';

export interface ContextSentenceProps {
    question: Question;
};

export class ContextSentence extends React.Component<ContextSentenceProps, {}> {

    highlightWord(sentence: string, word: string): JSX.Element {
        return <div>{sentence.split(' ').map(cur => {
            if (!cur.search(word)) {
                return <span key={cur} style={{ color: 'red'}}>{cur + ' '}</span>;
            } else {
                return cur + ' ';
            }
        })}</div>;
    }

    alterContext(question: Question, answer: string): JSX.Element {
        const header = question.prompts.length > 1 ? <h5>Alternative contexts</h5> : undefined;
        return <div>
            {header}
            <ul>
                {question.prompts.slice(1).map((prmt) => {
                    return <li key={prmt}>{this.highlightWord(prmt, answer)}</li>;
                })}
            </ul>
        </div>;
    }

    render(): JSX.Element {
        const question: Question = this.props.question;
        const answer = question.options[0];
        return <div>
            <h4>Context Sentence</h4>
            {this.highlightWord(question.prompts[0], answer)}
            {this.alterContext(question, answer)}
        </div>;
    };

}
