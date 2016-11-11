import * as React from 'react';
import {TextField} from 'material-ui';

let dummy = new TextField({name: 'dummy'});
type TextFieldProps = typeof dummy.props;

const bannedChar = /[^a-zA-Z'-]/g;

function wrap(props: any) {
    return Object.assign({}, props, {
        onChange: (ev: any) => {
            ev.target.value = ev.target.value.toLowerCase().replace(bannedChar, '');
            if ( props.onChange ) { props.onChange(ev); }
        }
    });
}

export const WordInput = (props: TextFieldProps) =>
        React.createElement(TextField, wrap(props));