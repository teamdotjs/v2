import * as React from 'react';
import {
    TextField
} from 'material-ui';

import {
    ChangeEvent
} from '../../util/ChangeEvent';

export interface ContextSentencesProps {
    name: string;
    value: string[];
    onChange: (value: string[]) => void;
}

export interface ContextSentencesState {
    value: string[];
}

export class ContextSentences extends React.Component<ContextSentencesProps, ContextSentencesState> {
    props: ContextSentencesProps;

    get name() {
        return this.props.name;
    }

    constructor(props: ContextSentencesProps) {
        super(props);
    }

    textFieldonChange(i: number) {
        return (ev: ChangeEvent<any>) => {
            let newVal = ([] as string[]).concat(this.props.value);
            if (i === this.props.value.length) {
                newVal.push(ev.target.value);
            } else {
                newVal[i] = ev.target.value;
            }
            newVal = newVal.filter((sentence, i) =>
                sentence !== '' || i === this.props.value.length);
            this.props.onChange(newVal);
            return true;
        };
    }

    render() {
        const inputs = this.props.value.concat(['']).map((sentence, i) =>
            <TextField fullWidth={true} name={'' + i} value={sentence} onChange={this.textFieldonChange(i)} key={i} hintText='New Context Sentence' />
        );
        return (
            <div>
                {inputs}
            </div>
        );
    }
}
