import * as React from 'react';
import {
    ContextSentance
} from '../Questions/ContextSentance';
import {
    Practice
} from '../../reducers/practiceReducer';
import {
    MultipleChoiceView
} from '../Questions/MultipleChoiceView';

export interface PracticeViewProps {
    practice: Practice;
};

export const PracticeView = (props: PracticeViewProps) => {
    if (props.practice.sections === undefined) {
        return <div>There are no sections, render error</div>;
    }
    const content = props.practice.sections.map((section) => {
        return <div key={section.type}>
            <h2>{section.type}</h2>
            {section.questions.map(q => {
                switch (q.type) {
                    case 'fitb':
                        return <ContextSentance question={q} key={q.id + q.type} />;
                    case 'mc':
                        return <MultipleChoiceView question={q} key={q.id + q.type} />;
                }
            })}
        </div>;
    });
    return <div>{content}</div>;
};
