import * as React from 'react';
import {
    SinglePracticeTaker
} from './SinglePracticeTaker';
import {
    Practice, practiceTypes
} from '../../reducers/practiceReducer';

import {
    Tabs, Tab, Paper, Toolbar, ToolbarTitle, Subheader
} from 'material-ui';

export interface PracticeViewProps {
    practices: Practice[];
};

const tabContentStyle = {
    padding: '40px',
};

export const PracticeTaker = (props: PracticeViewProps) => {
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
                        <SinglePracticeTaker practice={section} />
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
