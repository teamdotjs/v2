export interface WordForm {
    word: string;
    part_of_speech: string;
}

export interface WordInfo {
    word: string;
    part_of_speech?: string;
    forms?: WordForm[];
}

export interface Lesson {
    id: number;
    title: string;
    wordinfos: WordInfo[];
}

export type LessonState = {[id: number]: Lesson};

declare var LESSON_INIT_DATA: any;

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) {
        return LESSON_INIT_DATA.reduce((accm: LessonState, data: any) => {
            accm[data.id] = data;
            return accm;
        }, {});
    }
    switch (action.type) {
        case 'save_lesson_local':
            return Object.assign({
                [action.lesson.id]: action.lesson
            }, state);
        case 'create_lesson_success':
            return Object.assign({
                [action.id]: {
                    id: action.id,
                    title: '',
                    wordinfos: []
                }
            }, state);
        case 'load_all_lesssons_success':
            return action.lessons.reduce((s: any, lesson: Lesson) => {
                s[lesson.id] = lesson;
                return s;
            }, {});
        default:
            return state;
    }
};