export interface WordInfo {
    id?: number;
    word: string;
}

export interface Lesson {
    id: string;
    title: string;
    word_infos: WordInfo[];
}

export type LessonState = {[id: string]: Lesson};

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'save_lesson_local':
            return Object.assign(state, {
                [action.lesson.id]: action.lesson
            });
        case 'create_lesson_success':
            return Object.assign(state, {
                [action.id]: {
                    id: action.id,
                    title: '',
                    word_infos: []
                }
            });
        default:
            return state;
    }
};