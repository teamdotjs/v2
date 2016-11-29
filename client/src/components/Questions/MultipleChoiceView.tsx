import * as React from 'react';
import { QuestionView } from './QuestionView';
import {
    Question
} from '../../reducers/practiceReducer';

export class MultipleChoiceView extends QuestionView {

    renderQuestion(): JSX.Element {
        const question: Question = this.props.question;

        return <div>
            {question.prompts[0]}
            <ul>
                {question.options.map((opt) => {
                    const style = {
                        color: opt.is_correct ? 'green' : 'black'
                    };
                    return <li style={style} key={opt.value}>{opt.value}</li>;
                })}
            </ul>
        </div>;
    };

}
