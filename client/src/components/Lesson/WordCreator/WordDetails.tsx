import * as React from 'react';
import {
    TextField,
    Divider
} from 'material-ui';
import { WordInfo } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';

const style = {
  marginLeft: 20,
};

export interface WordDetailsProps {
    value: number;
    wordInfo: WordInfo;
    onChange: (v: number, w: WordInfo) => void;
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
        return (<div>
            {this.props.wordInfo.word}
            <br />
            <TextField hintText='Definition'
                    floatingLabelText='Definition'
                    multiLine={true}
                    fullWidth={true}
                    style={style}
                    underlineShow={false}
                    name='definition'
                    value={this.state['definition'] || ''}
                    onChange={this.bindValueToName.bind(this)}
                />
            <Divider />
        </div>);
    }
}
export default WordDetails;