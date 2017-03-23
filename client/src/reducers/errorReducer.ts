export const PRACTICE_ERROR = 'PRACTICE_ERROR';

export interface ErrorResponse extends JSON {
    errors: string[];
    error_message: string;
}

export interface ErrorState {
    errors: string[];
    pins: {
        [id: string]: string;
    };
}

export const errorReducer = (state: ErrorState, action: any): ErrorState => {
    if (state === undefined) return { errors: [], pins: {} };
    switch (action.type) {
        case 'error_push':
            let errors = state.errors;
            errors.push(action.error);
            return {
                ...state,
                errors,
            };
        case 'error_clear':
            return {
                ...state,
                errors: [],
            };
        case 'error_clear_single':
            return {
                ...state,
                errors: state.errors.filter((e: string) => e !== action.error),
            };
        case 'error_pin':
            return {
                ...state,
                pins: {
                    ...state.pins,
                    [action.pin]: action.error
                }
            };
        default:
            return state;
    }
};
