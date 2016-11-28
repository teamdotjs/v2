
export interface Practice {
    exists: boolean;
    isGenerating: boolean;
    data?: any;
    error?: Error;
};

export interface PracticeState {
    // ID in state is the lesson ID
    [id: string]: Practice;
};

export const practiceReducer = (state: PracticeState, action: any): PracticeState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'practice_generate':
            return Object.assign({}, state, {
                [action.id]: {
                    exists: true,
                    isGenerating: true
                }
            });
        case 'practice_save_local':
            return Object.assign({} , state, {
                [action.practice.id]: {
                    exists: true,
                    isGenerating: false,
                    data: action.practice
                }
            });
        case 'practice_save_error':
            return Object.assign({} , state, {
                [action.id]: {
                    exists: false,
                    isGenerating: false,
                    error: action.error
                }
            });
        default:
            return state;
    }
};
