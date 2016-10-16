import * as React from 'react';
import {WordInfo, WordInput} from './WordInput';

export interface WordCreatorProps {
    name?: string;
    value?: WordInfo[];
    onChange?: (ev?: any) => void;
}

export interface WordCreatorState {
    word_infos: WordInfo[];
}

export class WordCreator extends React.Component<WordCreatorProps, WordCreatorState> {
    state: WordCreatorState;
    inputs: WordInput[];

    constructor(props: WordCreatorProps) {
        super(props);
        this.inputs = [];
        this.state = {
            word_infos: (props.value || []).concat([{word: ''}]),
        };
    }

    get value() {
        // The last input will always be a dummy. Don't include it
        return this.state.word_infos.slice(0, this.state.word_infos.length - 1);
    }

    onWordChanged(i: number, _ev: any) {
        let word_infos = [] as WordInfo[];

        for (let i = 0; i < this.state.word_infos.length; i++) {
            word_infos.push(this.inputs[i].value);
        }

        if (i === word_infos.length - 1 && word_infos[i].word !== '') {
            // Create a new empty word
            word_infos.push({word: ''});
        } else if (i === word_infos.length - 2 && word_infos[i].word === '') {
            // If you empty the second-to-last input and the last input is empty,
            // Let's just remove that last empty input
            word_infos.pop();
        }


        this.setState({
            word_infos
        });

        if (this.props.onChange) {
            this.props.onChange({
                target: this
            });
        }
    }

    render() {
        let inputs = this.state.word_infos.map((w, i) =>
           (<WordInput key={i} value={w} onChange={this.onWordChanged.bind(this, i)} ref={(e) => this.inputs[i] = e}/>));

        return (
            <div>
                {inputs}
            </div>
        );
    }
}

export default WordCreator;