import * as React from 'react';
import { WordInput } from '../../util/WordInput';
import { WordForm, parts_of_speech } from '../../../reducers/lessonReducer';
import {
    TextField,
    SelectField,
    IconButton,
    MenuItem
} from 'material-ui';

interface WordFormSelectorProps {
    forms: WordForm[];
    newValue: string;
    onNewValueChange: (value: string) => void;
    onChange: (newValue: WordForm[]) => void;
}

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

    const newField = <WordInput
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

        return (<div key={`form-${index}`} style={{ display: 'flex' }}>
            <TextField
                name={`form-name-${index}`}
                defaultValue={form.word}
                onChange={changeHandleInput} />
            <SelectField
                style={{ width: '30%', marginLeft: '5%' }}
                value={form.part_of_speech}
                onChange={changeHandleSelection}>
                {parts_of_speech.map(part =>
                    <MenuItem key={part + `form-${index}`} value={part} primaryText={part}/>
                )}
            </SelectField>
            <IconButton iconClassName='material-icons'
                tooltip='Remove'
                iconStyle={{color: '#AAA'}}
                onClick={() => props.onChange(props.forms.filter((_,i) => i !== index))}>
                clear
            </IconButton>
        </div>);
    });

    return (<div>
        {newField}
        {forms}
    </div>);
};

export default WordFormSelector;
