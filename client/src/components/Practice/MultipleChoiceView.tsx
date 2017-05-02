import * as React from 'react';
import {
    Question
} from '../../reducers/practiceReducer';
import {
    RadioButtonGroup, RadioButton
} from 'material-ui';

import {QuestionViewProps} from './QuestionView';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

export class MultipleChoiceView extends React.Component<QuestionViewProps, {}> {

    render(): JSX.Element {
        const question: Question = this.props.question;

        return <div>
            <h3>{question.prompts[0]} </h3>
            <RadioButtonGroup name='response'>
                {question.options.map((opt) => {
                    return <RadioButton
                            style={styles.radioButton}
                            label={opt}
                            value={opt}
                            key={opt} />;
                })}
                </RadioButtonGroup>
        </div>;
    };

}
