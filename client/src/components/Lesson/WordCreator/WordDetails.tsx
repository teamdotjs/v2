import * as React from 'react';
import {
    TextField
} from 'material-ui';
import { WordInfo, WordForm } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';
import WordFormSelector from './WordFormSelector';
import { WordInput } from '../../util/WordInput';
import { TagBuilder } from '../../util/TagBuilder';

export interface WordDetailsProps {
    value: number;
    wordInfo: WordInfo;
    onChange: (w: WordInfo) => void;
    disabled?: boolean;
}

export interface WordDetailsState {
    wordFormNewValue: string;
}

export class WordDetails extends BindingComponent<WordDetailsProps, WordDetailsState> {

    constructor(props: WordDetailsProps) {
        super(props);
        this.state = {wordFormNewValue: ''};
    }

    componentWillReceiveProps(newProps: WordDetailsProps) {
        if (this.props.value !== newProps.value) {
            this.setState({
                wordFormNewValue: ''
            });
        }
    }

    shouldComponentUpdate(nextProps: WordDetailsProps, nextState: WordDetailsState) {
        return nextState !== this.state || nextProps.wordInfo !== this.props.wordInfo;
    }


    onFormChange(newForms: WordForm[]) {
        this.props.onChange({...this.props.wordInfo, forms: newForms});
    }

    onValueChange<K extends keyof WordInfo>(field: K) {
        return (value: WordInfo[K]) =>
            this.props.onChange({...this.props.wordInfo, [field as string]: value});
    }

    onValueEvent<K extends keyof WordInfo>(field: K) {
        return (ev: any) =>
            this.props.onChange({...this.props.wordInfo, [field as string]: ev.target.value});
    }


    render() {
        return (<div style={{paddingLeft: '20px'}}>
            <WordInput hintText='Word'
                    floatingLabelText='Word'
                    name='word'
                    value={this.props.wordInfo.word}
                    disabled={this.props.disabled}
                    onChange={this.onValueEvent('word')}
                />

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

            <h3>Forms</h3>
            <WordFormSelector
                forms={this.props.wordInfo.forms}
                onChange={this.onFormChange.bind(this)}
                onNewValueChange={ (val: string) => this.setState({ wordFormNewValue: val }) }
                newValue={this.state.wordFormNewValue || ''}
                disabled={this.props.disabled}
            />
        </div>);
    }
}
export default WordDetails;
