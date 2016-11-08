import * as React from 'react';
import {
    TextField,
    IconButton
} from 'material-ui';
import { WordInfo } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';
import { WordInput } from '../../util/WordInput';
import { TagBuilder } from '../../util/TagBuilder';

export interface WordDetailsProps {
    value: number;
    wordInfo: WordInfo;
    onChange: (v: number, w: WordInfo) => void;
    onDelete: () => void;
}

export class WordDetails extends BindingComponent<WordDetailsProps> {

    constructor(props: WordDetailsProps) {
        super(props);
        this.state = props.wordInfo as {[id: string]: any};
    }

    componentStateChange() {
        this.props.onChange(this.props.value, this.state as WordInfo);
    }

    componentWillReceiveProps(newProps: WordDetailsProps) {
        this.setState(newProps.wordInfo);
    }



    onWordEdit(ev: any) {
        this.setState({
            'word': ev.target.value
        }, this.componentStateChange.bind(this));
    }

    render() {
        return (<div style={{paddingLeft: '20px'}}>
            <WordInput hintText='Word'
                    floatingLabelText='Word'
                    name='word'
                    value={this.state['word'] || ''}
                    onChange={this.onWordEdit.bind(this)}
                />

            <IconButton onClick={this.props.onDelete}
                style={{display: 'inline-block',float: 'right'}}
                iconClassName='material-icons'
                tooltip='Delete'>delete</IconButton>

            <TextField hintText='Definition'
                    floatingLabelText='Definition'
                    multiLine={true}
                    fullWidth={true}
                    name='definition'
                    value={this.state['definition'] || ''}
                    onChange={this.bindValueToName.bind(this)}
                />

            <TagBuilder name='synonyms'
                    onChange={this.updateState('synonyms')}
                    values={this.state['synonyms']}
                    hintText='Synonyms'/>
            <TagBuilder name='antonyms'
                    onChange={this.updateState('antonyms')}
                    values={this.state['antonyms']}
                    hintText='Antonyms'/>

        </div>);
    }
}
export default WordDetails;