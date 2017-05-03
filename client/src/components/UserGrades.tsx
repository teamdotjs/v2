import * as React from 'react';
import Page from './util/Page';
import { LessonGradeSummary, GradeAggregate } from '../reducers/lessonGradeSummaryReducer';
import {
    Subheader, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn
} from 'material-ui';

export interface UserGradesProps {
    grades: LessonGradeSummary[];
    loading: boolean;
}

export const UserGrades = (props: UserGradesProps) => {
    function displayGrade(lesson: LessonGradeSummary, type: string) {
        const grade_summary = lesson.grade_summaries.find((g) => g.type === type);
        if (grade_summary === undefined) {
            return <TableRowColumn>- / -</TableRowColumn>;
        } else if (grade_summary.total_correct === null) {
            return <TableRowColumn>- / {grade_summary.total_questions}</TableRowColumn>;
        } else {
            return <TableRowColumn>
                {grade_summary.total_correct} / {grade_summary.total_questions}
            </TableRowColumn>;
        }
    }

    function displayTotalGrade(lesson: LessonGradeSummary) {
        if (lesson.grade_summaries.length === 0) {
            return <TableRowColumn>- / -</TableRowColumn>;
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
                return <TableRowColumn>{num_correct} / {num_questions}</TableRowColumn>;
            } else {
                return <TableRowColumn>- / {num_questions}</TableRowColumn>;
            }
        }
    }

    let lessons = props.grades.map((lesson) => {
        return <TableRow key={lesson.id}>
            <TableRowColumn colSpan={2} style={{whiteSpace: 'normal'}}>
                {lesson.title}
            </TableRowColumn>
            {displayGrade(lesson, 'synonym')}
            {displayGrade(lesson, 'definition')}
            {displayGrade(lesson, 'sentence')}
            {displayTotalGrade(lesson)}
        </TableRow>;
    });

    let content: any;
    if (props.grades.length > 0) {
        content = (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn colSpan={2}>Lesson</TableHeaderColumn>
                        <TableHeaderColumn>Synonym</TableHeaderColumn>
                        <TableHeaderColumn>Definition</TableHeaderColumn>
                        <TableHeaderColumn>Sentence</TableHeaderColumn>
                        <TableHeaderColumn>Total</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {lessons}
                </TableBody>
            </Table>
        );
    } else {
        content = <Subheader>You currently have no grades</Subheader>;
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

export default UserGrades;
