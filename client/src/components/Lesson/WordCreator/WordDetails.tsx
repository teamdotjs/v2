import * as React from 'react';
import {
    TextField,
    SelectField,
    MenuItem
} from 'material-ui';
import { WordInfo, WordForm, PartType, parts_of_speech, WordRoot } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';
import WordFormSelector from './WordFormSelector';
import WordRootSelector from './WordRootSelector';
import { WordInput } from '../../util/WordInput';
import { TagBuilder } from '../../util/TagBuilder';
import { ContextSentences } from './ContextSentences';

export interface WordDetailsProps {
    value: number;
    wordInfo: WordInfo;
    onChange: (w: WordInfo) => void;
    disabled?: boolean;
}

export interface WordDetailsState {
    wordFormNewValue: string;
    wordRootNewValue: string;
}

export class WordDetails extends BindingComponent<WordDetailsProps, WordDetailsState> {

    constructor(props: WordDetailsProps) {
        super(props);
        this.state = {
            wordFormNewValue: '',
            wordRootNewValue: ''
        };
    }

    componentWillReceiveProps(newProps: WordDetailsProps) {
        if (this.props.value !== newProps.value) {
            this.setState({
                wordFormNewValue: '',
                wordRootNewValue: ''
            });
        }
    }

    onFormChange(newForms: WordForm[]) {
        this.props.onChange({...this.props.wordInfo, forms: newForms});
    }

    onRootChange(newRoots: WordRoot[]) {
        this.props.onChange({...this.props.wordInfo, roots: newRoots});
    }

    onValueChange<K extends keyof WordInfo>(field: K) {
        return (value: WordInfo[K]) =>
            this.props.onChange({...this.props.wordInfo, [field as string]: value});
    }

    onValueEvent<K extends keyof WordInfo>(field: K) {
        return (ev: any) =>
            this.props.onChange({...this.props.wordInfo, [field as string]: ev.target.value});
    }

    changeHandleSelection = (_a: any, _b: any, value: PartType) => {
        this.props.onChange({...this.props.wordInfo, 'part_of_speech': value});
    }

    render() {
        return (<div style={{paddingLeft: '20px'}}>
            <div style={{ display: 'flex' }}>
                <WordInput hintText='Word'
                        floatingLabelText='Word'
                        name='word'
                        value={this.props.wordInfo.word}
                        style={{ width: '65%' }}
                        disabled={this.props.disabled}
                        onChange={this.onValueEvent('word')}
                    />

                <SelectField
                    style={{ width: '30%', marginLeft: '5%' }}
                    value={this.props.wordInfo.part_of_speech}
                    floatingLabelText='Part of speech'
                    onChange={this.changeHandleSelection}
                    disabled={this.props.disabled}>
                    {parts_of_speech.map(part =>
                        <MenuItem key={part + this.props.wordInfo.word} value={part} primaryText={part}/>
                    )}
                </SelectField>
            </div>

            <TextField hintText='Definition'
                    floatingLabelText='Definition'
                    multiLine={true}
                    fullWidth={true}
                    name='definition'
                    disabled={this.props.disabled}
                    value={this.props.wordInfo.definition}
                    onChange={this.onValueEvent('definition')}
                    style={{ width: '100%' }}
                />

            <TagBuilder name='synonyms'
                    onChange={this.onValueChange('synonyms')}
                    values={this.props.wordInfo.synonyms}
                    hintText='Synonyms'
                    disabled={this.props.disabled}/>

            <TagBuilder name='antonyms'
                    onChange={this.onValueChange('antonyms')}
                    values={this.props.wordInfo.antonyms}
                    hintText='Antonyms'
                    disabled={this.props.disabled}/>

            <h3>Roots</h3>
            <WordRootSelector
                roots={this.props.wordInfo.roots}
                onChange={this.onRootChange.bind(this)}
                onNewValueChange={ (val: string) => this.setState({ wordRootNewValue: val }) }
                newValue={this.state.wordRootNewValue}
                disabled={this.props.disabled}
            />

            <h3>Forms</h3>
            <WordFormSelector
                forms={this.props.wordInfo.forms}
                onChange={this.onFormChange.bind(this)}
                onNewValueChange={ (val: string) => this.setState({ wordFormNewValue: val }) }
                newValue={this.state.wordFormNewValue}
                disabled={this.props.disabled}
            />

            <h3>Context Sentences</h3>
            <ContextSentences name='sentences'
                value={this.props.wordInfo.sentences}
                onChange={this.onValueChange('sentences')}
                wordInfo={this.props.wordInfo}
                onChangeError={this.onValueChange}
            />
        </div>);
    }
}
export default WordDetails;
