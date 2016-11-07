import * as React from 'react';
import {WordInfo} from '../../../reducers/lessonReducer';
import { TextField, List, ListItem, Subheader } from 'material-ui';
import { WordListItem } from './WordListItem';
import { WordDetails } from './WordDetails';
import * as listUtil from 'material-ui/List';

let SelectableList = (listUtil as any).makeSelectable(List);

export interface WordCreatorProps {
    name?: string;
    value?: WordInfo[];
    onChange?: (w: WordInfo[]) => void;
}

export interface WordCreatorState {
    wordInfos: WordInfo[];
    currentWordIndex: number;
}

export class WordCreator extends React.Component<WordCreatorProps, WordCreatorState> {
    newInput: TextField;

    constructor(props: WordCreatorProps) {
        super(props);
        this.state = {
            wordInfos: props.value || [],
            currentWordIndex: -1
        };
    }

    get value() {
        // The last input will always be a dummy. Don't include it
        return this.state.wordInfos.slice(0, this.state.wordInfos.length - 1);
    }

    onWordChanged(i: number, word_info: WordInfo) {
        let wordInfos = [] as WordInfo[];

        wordInfos = Object.assign(this.state.wordInfos, {
            [i]: word_info
        });


        this.setState({
            wordInfos,
            currentWordIndex: this.state.currentWordIndex
        });

        // TODO state callback
        if (this.props.onChange) {
            this.props.onChange(wordInfos);
        }
    }

    onWordSelect(_: any, i: number) {
        this.setState({
            wordInfos: this.state.wordInfos,
            currentWordIndex: i
        });
    }

    isValidWord(word: string): boolean {
        return word !== '' &&
            word.indexOf(' ') < 0 && // TODO regex
            this.state.wordInfos.map((w: WordInfo) => w.word).indexOf(word) < 0;
    }

    onNewWordSubmit(ev: any) {
        ev.preventDefault();
        if (!this.isValidWord(this.newInput.getValue())) {
            // TODO, show error
            return;
        }

        this.setState({
            currentWordIndex: this.state.currentWordIndex,
            wordInfos: this.state.wordInfos.concat([{word: this.newInput.getValue()}])
        }, () => {
            if (this.props.onChange !== undefined) {
                this.props.onChange(this.state.wordInfos);
            }
        });
        ev.target.reset();
        return false;
    }

    render() {
        let wordItems = this.state.wordInfos.map((w, i) =>
            <ListItem key={i} value={i}>
                <WordListItem value={i} text={w.word} />
            </ListItem>
        );

        const wordInfo = <WordDetails
            wordInfo={this.state.wordInfos[this.state.currentWordIndex]}
            value={this.state.currentWordIndex}
            onChange={this.onWordChanged.bind(this)} />;

        const selectInfo = <Subheader>
            {'No word selected'}
        </Subheader>;

        return (
            <div style={{display: 'flex'}}>
                <div style={{width: '30%', borderRight: '1px solid lightgray'}}>
                     <form onSubmit={this.onNewWordSubmit.bind(this)}>
                        <TextField  style={{width: '100%'}}
                                    floatingLabelText='New Word'
                                    ref={(e: TextField) => this.newInput = e}/>
                    </form>
                    <SelectableList value={this.state.currentWordIndex}
                                    onChange={this.onWordSelect.bind(this)} >
                        {wordItems}
                    </SelectableList>
                </div>

                <div style={{width: '70%', padding: '15px'}}>
                    { this.state.currentWordIndex >= 0 ? wordInfo : selectInfo }
                </div>
            </div>
        );
    }
}

export default WordCreator;