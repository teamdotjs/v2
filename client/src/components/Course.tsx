import * as React from 'react';
import {
    Paper
} from 'material-ui';

export interface CourseProps {
}

const style = {
    container: {
        display: 'inline-block',
        width: '100%',
    },
    columnLeft: {
        float: 'left',
        padding: '25px',
        mardgin: '5px',
    },
    columnRight: {
        float: 'right',
        padding: '25px',
        mardgin: '5px',
    },
};

export const Course = (_props: CourseProps) => {
    return (<div style={style.container}>
        <Paper style={style.columnLeft}>
            Your Courses
        </Paper>
        <Paper style={style.columnRight}>
            Course Lessons
        </Paper>
    </div>);
};

export default Course;
