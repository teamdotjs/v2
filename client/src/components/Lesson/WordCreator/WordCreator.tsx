import * as React from 'react';
import {WordInfo} from '../../../reducers/lessonReducer';
import { TextField, List, ListItem, Subheader } from 'material-ui';
import { WordListItem } from './WordListItem';
import { WordDetails } from './WordDetails';
import { WordInput } from '../../util/WordInput';
import * as listUtil from 'material-ui/List';

let SelectableList = (listUtil as any).makeSelectable(List);

export interface WordCreatorProps {
    name: string;
    value: WordInfo[];
    onChange: (w: WordInfo[]) => void;
    disabled?: boolean;
}

export interface WordCreatorState {
    wordInfos: WordInfo[];
    currentWordIndex: number;
    inputText: string;
}

export class WordCreator extends React.Component<WordCreatorProps, WordCreatorState> {
    newInput: TextField;

    constructor(props: WordCreatorProps) {
        super(props);
        this.state = {
            wordInfos: props.value || [],
            currentWordIndex: -1,
            inputText: ''
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
            currentWordIndex: this.state.currentWordIndex,
            inputText: this.state.inputText
        }, () => {
             // TODO state callback
        if (this.props.onChange) {
            this.props.onChange(wordInfos);
        }
        });
    }

    onWordSelect(_: any, i: number) {
        this.setState({
            wordInfos: this.state.wordInfos,
            currentWordIndex: i,
            inputText: this.state.inputText
        });
    }

    isValidWord(word: string): boolean {
        return word !== '' &&
            word.indexOf(' ') < 0 && // TODO regex
            this.state.wordInfos.map((w: WordInfo) => w.word).indexOf(word) < 0;
    }

    deleteWord() {
        const wordInfos = this.state.wordInfos.filter((_: any, i: number) => i !== this.state.currentWordIndex);
        this.setState({
            wordInfos,
            currentWordIndex: -1,
            inputText: this.state.inputText
        });

        if (this.props.onChange) {
            this.props.onChange(wordInfos);
        }
    }

    onNewWordKeyPress(ev: any) {
        if (ev.keyCode !== 13 || !this.isValidWord(this.state.inputText)) {
            // TODO, show error
            return;
        }

        this.setState({
            currentWordIndex: this.state.currentWordIndex,
            wordInfos: this.state.wordInfos.concat([{
               word: this.state.inputText
            }]),
            inputText: ''
        }, () => {
            if (this.props.onChange !== undefined) {
                this.props.onChange(this.state.wordInfos);
            }
        });
    }

    onNewWordEdit(ev: any) {
        this.setState({
            currentWordIndex: this.state.currentWordIndex,
            wordInfos: this.state.wordInfos,
            inputText: ev.target.value.toLowerCase()
        });
    }

    componentWillReceiveProps(nextProps: WordCreatorProps) {
        this.setState({
            wordInfos: nextProps.value || []
        });
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
            onChange={this.onWordChanged.bind(this)}
            onDelete={this.deleteWord.bind(this)}
            disabled={this.props.disabled}/>;

        const selectInfo = <Subheader>
            {'No word selected'}
        </Subheader>;

        return (
            <div style={{display: 'flex'}}>
                <div style={{width: '30%', borderRight: '1px solid lightgray'}}>
                        <WordInput  style={{width: '100%', marginRight: '20px'}}
                                    floatingLabelText='New Word'
                                    underlineShow={false}
                                    onKeyDown={this.onNewWordKeyPress.bind(this)}
                                    value={this.state.inputText}
                                    disabled={this.props.disabled}
                                    onChange={this.onNewWordEdit.bind(this)}/>
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
