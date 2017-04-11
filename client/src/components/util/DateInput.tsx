import * as React from 'react';
import {TextField} from 'material-ui';

let dummy = new TextField({name: 'dummy'});
type TextFieldProps = typeof dummy.props;

const bannedChar = /[^0-9\/]/g;

function wrap(props: any) {
    return Object.assign({}, props, {
        onChange: (ev: any) => {
            ev.target.value = ev.target.value.toLowerCase().replace(bannedChar, '');
            ev.target.value = ev.target.value.toLowerCase().replace('//', '/');
            if ( props.onChange ) { props.onChange(ev); }
        }
    });
}

export const DateInput = (props: TextFieldProps) =>
        React.createElement(TextField, wrap(props));