import * as React from 'react';
import {
    Question
} from '../../reducers/practiceReducer';

export interface QuestionViewProps {
    question: Question;
};

export class QuestionView extends React.Component<QuestionViewProps, {}> {

    renderQuestion(): JSX.Element { return <div />; };

    render() {
        return <div>
            {this.renderQuestion()}
        </div>;
    }

}
