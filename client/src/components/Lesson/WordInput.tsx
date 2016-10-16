import * as React from 'react';
import {
    TextField,
} from 'material-ui';

export interface WordCreatorProps {
    value?: WordInfo;
    onChange?: () => void;
}

export interface WordInfo {
    word: string;
}

export class WordInput extends React.Component<WordCreatorProps, WordInfo> {

    constructor(props: WordCreatorProps) {
        super(props);
        this.state = {word: props.value !== undefined ? props.value.word : ''} as WordInfo;
    }

    get value() {
        return this.state;
    }

    onWordChanged(ev: any) {
        this.setState({
            word: ev.target.value
        });
        if (this.props.onChange !== undefined) {
            this.props.onChange();
        }
    }

    render() {
        return (
            <TextField value={this.state.word} hintText='New Word' onChange={this.onWordChanged.bind(this)} />
        );
    }
}

export default WordInput;