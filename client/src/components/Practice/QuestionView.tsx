import * as React from 'react';
import { Question } from '../../reducers/practiceReducer';
import { ContextSentence } from './ContextSentence';
import { MultipleChoiceView } from './MultipleChoiceView';
export interface QuestionViewProps {
    question: Question;
    onChange?: (newValue: string, id: number) => void;
    value?: string|number;
}

export const QuestionView = (props: QuestionViewProps) => {
    switch (props.question.type) {
        case 'fitb':
            return <ContextSentence {...props}/>;
        case 'mc':
            return <MultipleChoiceView {...props}/>;
    }
}