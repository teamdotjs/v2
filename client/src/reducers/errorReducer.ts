export interface ErrorState {
    errors: string[];
}

export const errorReducer = (state: ErrorState, action: any): ErrorState => {
    if (state === undefined) return { errors: [] };
    switch (action.type) {
        case 'error_push':
            let errors = state.errors;
            errors.push(action.error);
            return { errors };
        case 'error_clear':
            return { errors: [] };
        case 'error_clear_single':
            return {
                errors: state.errors.filter((e: string) => e !== action.error)
            };
        default:
            return state;
    }
};
