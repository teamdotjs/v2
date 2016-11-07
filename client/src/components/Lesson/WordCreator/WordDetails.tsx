import * as React from 'react';
import {
    TextField,
    IconButton
} from 'material-ui';
import { WordInfo } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';


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

    render() {
        return (<div style={{paddingLeft: '20px'}}>
            <TextField hintText='Word'
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
                />
        </div>);
    }
}
export default WordDetails;