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

interface MultiState {
    value?: any;
}

export class MultipleChoiceView extends React.Component<QuestionViewProps, MultiState> {

    constructor(props: QuestionViewProps) {
        super(props);
        this.state = { value: props.value };
    }

    onChange(value: any) {
        if (this.props.onChange) this.props.onChange(value, this.props.question.id);
        this.setState({value});
    }

    render(): JSX.Element {
        const question: Question = this.props.question;
        return <div>
            <h3>{question.prompts[0]} </h3>
            <RadioButtonGroup
                name='response'
                valueSelected={this.state.value}
                onChange={ (_: any, newOpt: any) => this.onChange(newOpt) }>
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
