import * as React from 'react';
import { Chip } from 'material-ui';
import { WordInput } from './WordInput';
export interface TagBuilderProps {
    values: string[];
    name: string;
    onChange: (v: string[]) => void;
    hintText: string;
}

export interface TagBuilderState {
    values: string[];
    inputText: string;
}

export class TagBuilder extends React.Component<TagBuilderProps, TagBuilderState> {
    constructor(props: TagBuilderProps) {
        super(props);
        this.state = {
            values: props.values || [],
            inputText: ''
        };
    }

    componentWillReceiveProps(nextProps: TagBuilderProps) {
        this.setState({
            values: nextProps.values || this.state.values,
            inputText: this.state.inputText
        });
    }

    onCommit(ev: React.KeyboardEvent<{}>) {
        if (ev.keyCode === 13) {
            this.setState({
                values: this.state.values.concat([this.state.inputText]),
                inputText: ''
            }, () => {
                this.props.onChange(this.state.values);
            });
        }
    }

    onInputChange(ev: any) {
        this.setState({
            values: this.state.values,
            inputText: ev.target.value.toLowerCase()
        });
    }

    onDeleteValue(i: number) {
        const values = this.state.values;
        this.setState({
            values: values.slice(0, i).concat(values.slice(i + 1)),
            inputText: this.state.inputText
        }, () => {
            this.props.onChange(this.state.values);
        });
    }

    render() {
        const error = this.state.values.filter(s => s === this.state.inputText).length > 0
                        ? 'Word already in list'
                        : undefined;

        const tags = this.state.values.map((s, i) =>
            <Chip key={s}
                onRequestDelete={this.onDeleteValue.bind(this,i)}
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
                />
                <div style={{marginTop: error === null ? 0 : '1em', display: 'flex', flexWrap: 'wrap'}}>
                    {tags}
                </div>
            </div>
        );
    }
}
export default TagBuilder;