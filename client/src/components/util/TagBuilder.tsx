import * as React from 'react';
import { Chip } from 'material-ui';
import { WordInput } from './WordInput';
export interface TagBuilderProps {
    values: string[];
    name: string;
    onChange: (v: string[]) => void;
    hintText: string;
    disabled?: boolean;
}

export interface TagBuilderState {
    inputText: string;
}

export class TagBuilder extends React.Component<TagBuilderProps, TagBuilderState> {
    constructor(props: TagBuilderProps) {
        super(props);
        this.state = {
            inputText: ''
        };
    }

    onCommit(ev: React.KeyboardEvent<{}>) {
        if (ev.keyCode === 13) {
            this.props.onChange(this.props.values.concat([this.state.inputText]));
            this.setState({
                inputText: ''
            });
        }
    }

    onInputChange(ev: any) {
        this.setState({
            inputText: ev.target.value
        });
    }

    onDeleteValue(i: number) {
        const values = this.props.values;
        this.props.onChange(values.slice(0, i).concat(values.slice(i + 1)));
    }

    render() {
        const error = this.props.values.find(s => s === this.state.inputText)
                        ? 'Word already in list'
                        : undefined;
        const tags = this.props.values.map((s, i) =>
            <Chip key={s}
                onRequestDelete={this.props.disabled ? undefined : this.onDeleteValue.bind(this,i)}
                style={{margin: '4px'}}
            >
            {s}
            </Chip>);
        return (
            <div>
                <WordInput
                    floatingLabelText={this.props.hintText}
                    name={this.props.name}
                    value={this.state.inputText}
                    onKeyDown={error == null ? this.onCommit.bind(this) : null}
                    onChange={this.onInputChange.bind(this)}
                    errorText={error}
                    disabled={this.props.disabled}
                />
                <div style={{marginTop: error === null ? 0 : '1em', display: 'flex', flexWrap: 'wrap'}}>
                    {tags}
                </div>
            </div>
        );
    }
}
export default TagBuilder;
