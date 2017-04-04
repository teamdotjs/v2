import * as React from 'react';
import {
    TextField
} from 'material-ui';
import{WordInfo, WordForm} from '../../../reducers/lessonReducer';
import {
    ChangeEvent
} from '../../util/ChangeEvent';

export interface ContextSentencesProps {
    name: string;
    wordInfo: WordInfo;
    value: string[];
    onChange: (value: string[]) => void;
    onChangeError: (error: string[]) => void;
}

export interface ContextSentencesState {
    value: string[];
    error: string[];
}

export class ContextSentences extends React.Component<ContextSentencesProps, ContextSentencesState> {
    props: ContextSentencesProps;

    get name() {
        return this.props.name;
    }

    constructor(props: ContextSentencesProps) {
        super(props);
        this.state = {
            value: ([] as string[]),
            error: ([] as string[]),
        };
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
            if (ev.target) {
                const result = ([] as number[]);
                if (newVal[i] !== undefined) {
                    result.push(newVal[i].search(this.props.wordInfo.word));
                    this.props.wordInfo.forms.forEach((item: WordForm) => {result.push(newVal[i].search(item.word)); });
                    if ( result.find((value: number) => value !== -1 ) !== undefined) {
                        const error = Object.assign(this.state.error, {[i]: '',
                        });
                        this.props.onChangeError(error);
                    }
                    else {
                        const error = Object.assign(this.state.error,
                        {[i]: 'Sentence does not contain: '.concat(this.props.wordInfo.word).concat(' or one of its forms')
                            });
                        this.props.onChangeError(error);
                    }
                }
                else {
                    const error = Object.assign(this.state.error, {[i]: ''
                        });
                    this.props.onChangeError(error);
                }
            }
            return true;
        };
    }

    render() {
        const inputs = this.props.value.concat(['']).map((sentence, i) =>
            <TextField fullWidth={true} name={'' + i} value={sentence} onChange={this.textFieldonChange(i)} key={i} hintText='New Context Sentence' errorText={(this.state.error[i] !== undefined) ? this.state.error[i] : ''}/>
        );
        return (
            <div>
                {inputs}
            </div>
        );
    }
}
