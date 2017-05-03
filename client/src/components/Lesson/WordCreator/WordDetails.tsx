import * as React from 'react';
import { Chip } from 'material-ui';
import { WordInfo } from '../../../reducers/lessonReducer';
import { BindingComponent } from '../../util/BindingComponent';

export interface WordDetailsProps {
    value: number;
    wordInfo: WordInfo;
}

const styles = {
    display: 'flex',
    flexWrap: 'wrap'
};

export class WordDetails extends BindingComponent<WordDetailsProps, {}> {

    constructor(props: WordDetailsProps) {
        super(props);
    }

    render() {
        const word = this.props.wordInfo.part_of_speech
            ? <h1>{this.props.wordInfo.word} ({this.props.wordInfo.part_of_speech})</h1>
            : <h1>{this.props.wordInfo.word}</h1>;

        const synonyms = this.props.wordInfo.synonyms.length > 0
            ? this.props.wordInfo.synonyms.map((s, i) =>
                <Chip key={'synonym' + i} style={{margin: '4px'}}>{s}</Chip>)
            : <p>There are no synonyms to display.</p>;

        const antonyms = this.props.wordInfo.antonyms.length > 0
            ? this.props.wordInfo.antonyms.map((a, i) =>
                <Chip key={'antonym' + i} style={{margin: '4px'}}>{a}</Chip>)
            : <p>There are no antonyms to display.</p>;

        const roots = this.props.wordInfo.roots.length > 0
            ? this.props.wordInfo.roots.map((root, i) =>
                <p key={'root' + i}><b>{root.root}</b>: {root.meaning}</p>)
            : <p>There are no roots to display.</p>;

        const forms = this.props.wordInfo.forms.length > 0
            ? this.props.wordInfo.forms.map((form, i) =>
                <p key={'form' + i}>{form.word} ({form.part_of_speech})</p>)
            : <p>There are no forms to display.</p>;

        const sentences = this.props.wordInfo.sentences.length > 0
            ? this.props.wordInfo.sentences.map((s, i) =>
                <p key={'sentence' + i}>{s}</p>)
            : <p>There are no sentences to display.</p>;

        return (<div style={{paddingLeft: '20px'}}>
            {word}

            <h3>Definition</h3>
            <p>{this.props.wordInfo.definition}</p>

            <h3>Synonyms</h3>
            <div style={this.props.wordInfo.synonyms.length > 0 ? styles : undefined}>
                {synonyms}
            </div>

            <h3>Antonyms</h3>
            <div style={this.props.wordInfo.synonyms.length > 0 ? styles : undefined}>
                {antonyms}
            </div>

            <h3>Roots</h3>
            {roots}

            <h3>Forms</h3>
            {forms}

            <h3>Context Sentences</h3>
            {sentences}
        </div>);
    }
}
export default WordDetails;
