import * as React from 'react';
import Page from './util/Page';
import { CourseGradeSummary } from '../reducers/courseGradeSummaryReducer';
import { LessonGradeSummary, GradeAggregate } from '../reducers/lessonGradeSummaryReducer';
import {
    Subheader, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn
} from 'material-ui';

export interface CourseGradesProps {
    grades: CourseGradeSummary[];
    loading: boolean;
}

const styles = {
    width: 60,
    whiteSpace: 'normal'
};

export const CourseGrades = (props: CourseGradesProps) => {
    function displayTotalGrade(lesson: LessonGradeSummary) {
        if (lesson.grade_summaries.length === 0) {
            return <TableRowColumn key={lesson.id + 'grade'} style={styles}>
                - / -
            </TableRowColumn>;
        } else {
            let practice_taken = false;
            let num_correct = 0;
            let num_questions = 0;
            lesson.grade_summaries.map((grade_summary: GradeAggregate) => {
                if (grade_summary.total_correct !== null) {
                    practice_taken = true;
                    num_correct += grade_summary.total_correct;
                }
                num_questions += grade_summary.total_questions;
            });
            if (practice_taken) {
                return <TableRowColumn key={lesson.id + 'grade'} style={styles}>
                    {num_correct} / {num_questions}
                </TableRowColumn>;
            } else {
                return <TableRowColumn key={lesson.id + 'grade'} style={styles}>
                    - / {num_questions}
                </TableRowColumn>;
            }
        }
    }

    let content: any;
    if (props.grades && props.grades.length > 0) {
        content = (
            <Table selectable={false} bodyStyle={{overflow: 'visible'}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: '100px'}}>Student</TableHeaderColumn>
                        {props.grades[0].lessons.map((lesson: LessonGradeSummary) =>
                            <TableHeaderColumn
                                key={lesson.id + lesson.title}
                                style={styles}>
                                {lesson.title}
                            </TableHeaderColumn>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {props.grades.map((grade_summary) =>
                        <TableRow key={grade_summary.user.id}>
                            <TableRowColumn style={{whiteSpace: 'normal', width: '100px'}}>
                                {grade_summary.user.name}
                            </TableRowColumn>
                            {grade_summary.lessons.map((lesson) =>
                                displayTotalGrade(lesson)
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    } else {
        content = <Subheader>This course currently has no grades</Subheader>;
    }

    if (props.loading) {
        content = <Subheader>Loading...</Subheader>;
    }
    return  (
        <Page>
            <h2>Grades</h2>
            {content}
        </Page>
    );
};

export default CourseGrades;
