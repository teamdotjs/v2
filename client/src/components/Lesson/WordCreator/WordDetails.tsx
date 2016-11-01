import * as React from 'react';
import {
    ListItem,
} from 'material-ui';

export interface WordDetailsProps {
    value: number,
    text: string
}

export class WordDetails extends React.Component<WordDetailsProps, {}> {

    constructor(props: WordDetailsProps) {
        super(props);
    }   

    render() {
        return <div>{this.props.text}</div>;
    }
}

export default WordDetails;