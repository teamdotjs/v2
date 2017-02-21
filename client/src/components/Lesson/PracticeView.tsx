import * as React from 'react';
import {
    ContextSentence
} from '../Practice/ContextSentence';
import {
    Practice, practiceTypes, SectionType
} from '../../reducers/practiceReducer';
import {
    MultipleChoiceView
} from '../Practice/MultipleChoiceView';
import {
    Tabs, Tab, Paper, Toolbar, ToolbarTitle, ToolbarGroup, IconMenu, IconButton, MenuItem, FontIcon, Subheader, FlatButton
} from 'material-ui';

export interface PracticeViewProps {
    practices: Practice[];
    onCreatePractice: (type: SectionType) => void;
    onPreviewPractice: () => void;
    onRemovePractice: (id: number) => void;
};

const tabContentStyle = {
    padding: '40px',
};

export const PracticeView = (props: PracticeViewProps) => {
    let content = undefined;
    let availableTypes = practiceTypes;
    if (props.practices === undefined ||
        props.practices.length === 0) {
        content = <div style={tabContentStyle}><Subheader>You currently have no practices</Subheader></div>;
    } else {
        content = (
            <Tabs value={0} >
            {props.practices.map((section, i) =>
                <Tab key={i} label={
                    <span>
                    {section.type}
                    <IconButton tooltip='Clear'
                                iconStyle={{fontSize: '1em', color: 'rgba(255,255,255,.8)'}}
                                style={{fontSize: '1em'}}
                                onClick={() => props.onRemovePractice(section.id)}>
                        <FontIcon className='material-icons'>clear</FontIcon>
                    </IconButton>
                    </span>
                } value={i}>
                    <div style={tabContentStyle}>
                        {section.questions.map(q => {
                        switch (q.type) {
                            case 'fitb':
                                return <ContextSentence question={q} key={q.id + q.type} />;
                            case 'mc':
                                return <MultipleChoiceView question={q} key={q.id + q.type} />;
                        }
                        })}
                    </div>
                </Tab>
            )}
            </Tabs>);

        // Filter available types
        availableTypes = availableTypes.filter((t: string) =>
            !props.practices!.map((s) => s.type).find((st) =>
                st === t));
    }

    let createMenu = (
        <IconMenu onChange={(_, v) => props.onCreatePractice(v)} iconButtonElement={
            <IconButton tooltip='Add' disabled={availableTypes.length === 0}>
                <FontIcon className='material-icons'>add</FontIcon>
            </IconButton>
        }>
            {availableTypes.map((t) => <MenuItem
                                        key={t}
                                        style={{textTransform: 'capitalize'}}
                                        primaryText={t}
                                        value={t}/>)}
        </IconMenu>
    );

    return (
    <Paper style={{marginBottom: '40px'}}>
        <Toolbar>
            <ToolbarTitle text='Practices' />
            <ToolbarGroup>
                <FlatButton
                    onClick={props.onPreviewPractice}
                    style={{marginRight: 0}}
                    secondary={true}
                    label='Preview' />
                {createMenu}
            </ToolbarGroup>
        </Toolbar>
        {content}
    </Paper>);
};
