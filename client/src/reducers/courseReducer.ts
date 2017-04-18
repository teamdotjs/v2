export interface Course {
    id: number;
    instructor_id: number;
    title: string;
}

export interface CourseState {
    [id: number]: Course;
}

export const courseReducer = (state: CourseState, action: any): CourseState => {
    if (state === undefined) return { };
    switch (action.type) {
        case 'load_courses':
             let newState = {...state};
            action.courses.forEach(
                (c: Course) => newState[c.id] = c
            );
            return newState;
        case 'load_course':
            return {...state, [action.course.id]: action.course};
        default:
            return state;
    }
};