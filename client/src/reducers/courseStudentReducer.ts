import { User } from './sessionReducer';

export interface CourseStudentState {
    [id: number]: User[];
}

export const courseStudentReducer = (state: CourseStudentState, action: any): CourseStudentState => {
    if (state === undefined) return { };
    switch (action.type) {
        case 'load_course_students':
            return {...state, [action.course_id]: action.students};
        case 'add_student_to_course':
            return {...state, [action.course_id]: action.students};
        default:
            return state;
    }
};