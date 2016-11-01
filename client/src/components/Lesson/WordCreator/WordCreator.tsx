import * as React from 'react';
import {WordInfo} from '../../../reducers/lessonReducer';
import { TextField, List, ListItem, Subheader } from 'material-ui';
import { WordListItem } from './WordListItem';
import { WordDetails } from './WordDetails';
import { makeSelectable } from 'material-ui/List';
let SelectableList = makeSelectable(List);

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
            currentWordIndex: 0
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

        if (this.props.onChange) {
            this.props.onChange(wordInfos);
        }
    }

    onWordSelect(_: any, i: number) {
        console.log("HUH");
        this.setState({
            wordInfos: this.state.wordInfos,
            currentWordIndex: i
        })
    }

    onNewWordSubmit(ev: any) {
        this.setState({
            currentWordIndex: this.state.currentWordIndex,
            wordInfos: this.state.wordInfos.concat([{word: this.newInput.getValue()}])
        });
        ev.target.reset();
        ev.preventDefault();
        return false;
    }

    render() {
        let wordItems = this.state.wordInfos.map((w, i) =>
            <ListItem key={i} value={i}>
                <WordListItem value={i} text={w.word} />
            </ListItem>
        );

        return (
            <div>
             <div style={{display: 'inline-block', width: '30%'}}>
                     <form onSubmit={this.onNewWordSubmit.bind(this)}>
                        <TextField  style={{width: '100%'}}
                                    floatingLabelText='New Word'
                                    ref={(e: TextField) => this.newInput = e}/>
                    </form>
                    <SelectableList value={this.state.currentWordIndex}
                                    onChange={this.onWordSelect.bind(this)}
                                    requestChange={this.onWordSelect.bind(this)}>
                        {wordItems}
                    </SelectableList>
            </div>

            <div style={{display:'inline-block', width: '70%'}}>
                <WordDetails />
            </div>
            </div>
        );
    }
}

export default WordCreator;