import * as React from 'react';
import {
    Practice, practiceTypes
} from '../../reducers/practiceReducer';

import {
    Tabs, Tab, Paper, Toolbar, ToolbarTitle, Subheader, RaisedButton
} from 'material-ui';

export interface PracticeSelectorProps {
    practices: Practice[];
    loading?: boolean;
    onLoad: () => void;
    takePractice: (id: number) => void;
};

const tabContentStyle = {
    padding: '40px',
    textAlign: 'center',
};

export const PracticeSelector = (props: PracticeSelectorProps) => {
    let content = undefined;
    let availableTypes = practiceTypes;

    if (props.practices.length === 0) {
        content = <div style={tabContentStyle}><Subheader>No Practices exist for this lesson.</Subheader></div>;
    } else {
        content = (
            <Tabs value={0} >
            {props.practices.map((section, i) =>
                <Tab key={i} label={
                    <span>
                    {section.type}
                    </span>
                } value={i}>
                    <div style={tabContentStyle}>
                        <RaisedButton
                            label='Take Practice'
                            onClick={ () => props.takePractice(section.id) }/>
                    </div>
                </Tab>
            )}
            </Tabs>);

        // Filter available types
        availableTypes = availableTypes.filter((t: string) =>
            !props.practices!.map((s) => s.type).find((st) =>
                st === t));
    }

    return (
    <Paper style={{marginBottom: '40px'}}>
        <Toolbar>
            <ToolbarTitle text='Practices' />
        </Toolbar>
        {content}
    </Paper>);
};
