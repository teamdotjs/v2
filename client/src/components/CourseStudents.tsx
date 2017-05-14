import * as React from 'react';
import Page from './util/Page';
import { User } from '../reducers/sessionReducer';
import {
    Subheader,
    Table,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableBody,
    TableRowColumn,
    TextField
} from 'material-ui';

export interface CourseStudentsProps {
    students: User[];
    loading: boolean;
    addStudent: (email: string) => void;
}

export const CourseStudents = (props: CourseStudentsProps) => {
    const onEnterPress = (ev: any) => {
        if (ev.keyCode === 13) {
            props.addStudent(ev.target.value);
            ev.target.value = '';
        }
    };

    let content: any;
    if (props.students && props.students.length > 0) {
        content = (
            <Table selectable={false} bodyStyle={{overflow: 'visible'}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Student</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Birthday</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {props.students.map((student) =>
                        <TableRow key={student.id}>
                            <TableRowColumn style={{whiteSpace: 'normal'}}>
                                {student.name}
                            </TableRowColumn>
                            <TableRowColumn style={{whiteSpace: 'normal'}}>
                                {student.email}
                            </TableRowColumn>
                            <TableRowColumn style={{whiteSpace: 'normal'}}>
                                {student.birthday}
                            </TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    } else {
        content = <Subheader>This course currently has no students</Subheader>;
    }

    if (props.loading) {
        content = <Subheader>Loading...</Subheader>;
    }
    return  (
        <Page>
            <h2>Students</h2>
            {content}
            <TextField hintText='Add Student (by email)' onKeyDown={onEnterPress} />
        </Page>
    );
};

export default CourseStudents;
