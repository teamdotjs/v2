export interface Question {
    id: number;
    type: 'fitb' | 'mc';
    prompts: string[];
    options: string[];
};

export type SectionType = 'synonym' | 'sentence';

export interface Practice {
    id: number;
    type: SectionType;
    questions: Question[];
};

export interface PracticeState {
    // ID in state is the lesson ID
    [id: number]: Practice;
};

export const practiceTypes = ['synonym', 'sentence'] as SectionType[];

export const practiceReducer = (state: PracticeState, action: any): PracticeState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'practice_load_success':
            let newPractices = action.practices.reduce(
                (state: PracticeState, practice: Practice) => {
                    state[practice.id] = practice;
                    return state;
                }, {});
            return Object.assign({}, state, newPractices);
        case 'practice_delete_success':
            let ns = Object.assign({}, state, newPractices);
            delete ns[action.id];
            return ns;
        case 'practice_save_local':
            return {...state, [action.practice.id]: action.practice};
        default:
            return state;
    }
};
