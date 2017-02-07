import * as React from 'react';
import {
    TextField,
    IconButton
} from 'material-ui';
import { WordInfo, WordForm } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';
import WordFormSelector from './WordFormSelector';
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
        this.setState(newProps.wordInfo as {[id: string]: any});
    }

    onFormChange(newForms: WordForm[]) {
        this.setState({
            forms: newForms
        }, this.componentStateChange.bind(this));
    }

    render() {
        return (<div style={{paddingLeft: '20px'}}>
            <WordInput hintText='Word'
                    floatingLabelText='Word'
                    name='word'
                    value={this.state['word'] || ''}
                    onChange={this.bindValueToName.bind(this)}
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
                    style={{ width: '100%' }}
                />

            <TagBuilder name='synonyms'
                    onChange={this.updateState('synonyms')}
                    values={this.state['synonyms']}
                    hintText='Synonyms'/>

            <TagBuilder name='antonyms'
                    onChange={this.updateState('antonyms')}
                    values={this.state['antonyms']}
                    hintText='Antonyms'/>

            <h3>Forms</h3>
            <WordFormSelector
                forms={this.props.wordInfo.forms || []}
                onChange={this.onFormChange.bind(this)}
                onNewValueChange={ (val: string) => this.setState({ wordFormNewValue: val }) }
                newValue={this.state['wordFormNewValue'] || ''}
            />

        </div>);
    }
}
export default WordDetails;
