import * as React from 'react';
import { WordInput } from '../../util/WordInput';
import { WordRoot } from '../../../reducers/lessonReducer';
import {
    TextField,
    IconButton
} from 'material-ui';

interface WordRootSelectorProps {
    roots: WordRoot[];
    newValue: string;
    onNewValueChange: (value: string) => void;
    onChange: (newValue: WordRoot[]) => void;
}

const WordRootSelector = (props: WordRootSelectorProps) => {
    const onEnterPress = (ev: any) => {
        if (ev.keyCode === 13) {
            let newRoots = props.roots;
            newRoots.push({
                root: ev.target.value,
                meaning: ''
            });
            props.onNewValueChange('');
            props.onChange(newRoots);
        }
    };

    const newField = <WordInput
        name={'new'}
        value={props.newValue}
        floatingLabelText='Add root'
        style={{ width: '100%'}}
        onKeyDown={onEnterPress}
        onChange={ (ev: any) => props.onNewValueChange(ev.target.value as string) } />;

    if (props.roots.length === 0) {
        return newField;
    }

    const roots = props.roots.map((root: WordRoot, index: number) => {

        const onRootChange = (ev: any) => {
            let newRoots = props.roots;
            newRoots[index].root = ev.target.value;
            props.onChange(newRoots);
        };

        const onMeaningChange = (ev: any) => {
            let newRoots = props.roots;
            newRoots[index].meaning = ev.target.value;
            props.onChange(newRoots);
        };

        return (<div key={root.root} style={{ display: 'flex' }}>
            <TextField
                name={root.root}
                value={root.root}
                hintText='Root'
                style={{ width: '20%'}}
                onChange={onRootChange} />
            <TextField
                name={root.meaning}
                value={root.meaning}
                hintText='Root meaning'
                style={{ width: '75%', marginLeft: '5%' }}
                onChange={onMeaningChange} />
            <IconButton iconClassName='material-icons'
                tooltip='Remove'
                iconStyle={{color: '#AAA'}}
                onClick={() => props.onChange(props.roots.filter((_, i) => i !== index))}>
                clear
            </IconButton>
        </div>);
    });

    return (<div>
        {newField}
        {roots}
    </div>);
};

export default WordRootSelector;
