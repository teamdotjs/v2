import * as React from 'react';
import { WordForm } from '../../../reducers/lessonReducer';
import {
    TextField,
    SelectField,
    MenuItem
} from 'material-ui';

interface WordFormSelectorProps {
    forms: WordForm[];
    newValue: string;
    onNewValueChange: (value: string) => void;
    onChange: (newValue: WordForm[]) => void;
}

const PARTS = ['noun', 'verb', 'adjective', 'determiner', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'];

const WordFormSelector = (props: WordFormSelectorProps) => {
    const onEnterpress = (ev: any) => {
        if (ev.keyCode === 13) {
            let newForms = props.forms;
            newForms.push({
                word: ev.target.value,
                part_of_speech: 'noun'
            });
            props.onNewValueChange('');
            props.onChange(newForms);
        }
    };

    const newField = <TextField
        name={'new'}
        value={props.newValue}
        floatingLabelText='Add form'
        style={{ width: '100%'}}
        onKeyDown={onEnterpress}
        onChange={ (ev: any) => props.onNewValueChange(ev.target.value as string) } />;

    if (props.forms.length === 0) {
        return newField;
    }

    const forms = props.forms.map((form: WordForm, index: number) => {

        const changeHandleSelection = (_a: any, _b: any, value: string) => {
            let newForms = props.forms;
            newForms[index].part_of_speech = value;
            props.onChange(newForms);
        };

        const changeHandleInput = (ev: any) => {
            let newForms = props.forms;
            newForms[index].word = ev.target.value;
            props.onChange(newForms);
        };

        return (<div key={form.word} style={{ display: 'flex' }}>
            <TextField name={form.word} value={form.word} style={{ width: '70%'}} onChange={changeHandleInput} />
            <SelectField style={{ width: '30%'}} value={form.part_of_speech} onChange={changeHandleSelection} >
                {PARTS.map(part => <MenuItem key={part + form.word} value={part} primaryText={part}/>)}
            </SelectField>
        </div>);
    });

    return (<div>
        {forms}
        {newField}
    </div>);
};

export default WordFormSelector;
