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
    currentWordIndex: number;
    inputText: string;
}

export class WordCreator extends React.Component<WordCreatorProps, WordCreatorState> {
    newInput: TextField;

    constructor(props: WordCreatorProps) {
        super(props);
        this.state = {
            currentWordIndex: -1,
            inputText: ''
        };
    }

    get value() {
        // The last input will always be a dummy. Don't include it
        return this.props.value;
    }

    onWordChanged(i: number, word_info: WordInfo) {
        const wordInfos = Object.assign(this.props.value, {
            [i]: word_info
        });

        this.props.onChange(wordInfos);
    }

    onWordSelect(_: any, i: number) {
        this.setState({
            currentWordIndex: i
        });
    }

    isValidWord(word: string): boolean {
        return word !== '' &&
            word.indexOf(' ') < 0 && // TODO regex
            this.props.value.find((w: WordInfo) => w.word === word) === undefined;
    }

    deleteWord() {
        const wordInfos = this.props.value.filter((_: any, i: number) => i !== this.state.currentWordIndex);
        this.setState({ currentWordIndex: -1 });

        this.props.onChange(wordInfos);
    }

    onNewWordKeyPress(ev: any) {
        if (ev.keyCode !== 13 || !this.isValidWord(this.state.inputText)) {
            // TODO, show error
            return true;
        }

        const wordInfos = this.props.value.concat([
                new WordInfo(this.state.inputText)
        ]);

        this.setState({
            inputText: ''
        }, () => {
            this.props.onChange(wordInfos);
        });
        return true;
    }

    onNewWordEdit(ev: any) {
        this.setState({
            inputText: ev.target.value
        });
    }

    render() {
        let wordItems = this.props.value.map((w, i) =>
            <ListItem key={i} value={i}>
                <WordListItem
                    value={i}
                    text={w.word}
                    onDelete={this.deleteWord.bind(this)}
                    disabled={this.props.disabled}/>
            </ListItem>
        );

        const wordInfo = <WordDetails
            wordInfo={this.props.value[this.state.currentWordIndex]}
            value={this.state.currentWordIndex}
            onChange={this.onWordChanged.bind(this, this.state.currentWordIndex)}
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
