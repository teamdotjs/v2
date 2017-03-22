import * as React from 'react';
import { IconButton } from 'material-ui';

export interface WordListItemProps {
    value: number;
    text: string;
    onDelete: () => void;
    disabled?: boolean;
}

export class WordListItem extends React.Component<WordListItemProps, {}> {

    constructor(props: WordListItemProps) {
        super(props);
    }

    render() {
        const deleteButton = this.props.disabled ? undefined :
            <IconButton onClick={this.props.onDelete}
                style={{float: 'right', marginTop: '-16px'}}
                iconClassName='material-icons'
                iconStyle={{color: '#AAA'}}
                disabled={this.props.disabled}
                tooltip='Remove'>clear</IconButton>;
        return (<div>
                {this.props.text}
                {deleteButton}
        </div>);
    }
}

export default WordListItem;
