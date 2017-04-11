export interface CourseState {
}

export const courseReducer = (state: CourseState, action: any): CourseState => {
    if (state === undefined) return { };
    switch (action.type) {
        default:
            return state;
    }
};