import * as React from 'react';
import {
    ListItem,
} from 'material-ui';

export interface WordListItemProps {
    value: number,
    text: string
}

export class WordListItem extends React.Component<WordListItemProps, {}> {

    constructor(props: WordListItemProps) {
        super(props);
    }   

    render() {
        return <div>{this.props.text}</div>;
    }
}

export default WordListItem;