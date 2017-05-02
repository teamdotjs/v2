import * as React from 'react';
import { Question } from '../../reducers/practiceReducer';
import { ContextSentence } from './ContextSentence';
import { MultipleChoiceView } from './MultipleChoiceView';
export interface QuestionViewProps {
    question: Question;
}

export const QuestionView = (props: QuestionViewProps) => {
    switch (props.question.type) {
        case 'fitb':
            return <ContextSentence question={props.question} />;
        case 'mc':
            return <MultipleChoiceView question={props.question} />;
    }
}