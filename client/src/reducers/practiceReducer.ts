export interface Question {
    id: number;
    type: 'fitb' | 'mc';
    prompts: string[];
    options: string[];
};

export type SectionType = 'synonym' | 'sentence';

export interface Section {
    id: number;
    type: SectionType;
    questions: Question[];
};

export interface Practice {
    loading: boolean;
    isGenerating: boolean;
    sections?: Section[];
    error?: Error;
};

export interface PracticeState {
    // ID in state is the lesson ID
    [id: number]: Practice;
};

export const practiceTypes = ['synonym', 'sentence'] as SectionType[];

export const practiceReducer = (state: PracticeState, action: any): PracticeState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'practice_load':
            return Object.assign({}, state, {
                [action.id]: {
                    loading: true,
                    isGenerating: false
                }
            });
        case 'practice_generate':
            return Object.assign({}, state, {
                [action.id]: {
                    loading: true,
                    isGenerating: true
                }
            });
        case 'practice_save_local':
            return Object.assign({} , state, {
                [action.id]: {
                    loading: false,
                    isGenerating: false,
                    sections: action.practices
                }
            });
        case 'practice_save_error':
            console.log(action);
            return Object.assign({} , state, {
                [action.id]: {
                    loading: false,
                    isGenerating: false,
                    error: action.error
                }
            });
        default:
            return state;
    }
};
