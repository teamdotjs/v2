export interface WordForm {
    word: string;
    part_of_speech: string;
}

export interface WordRoot {
    root: string;
    meaning: string;
}

export class WordInfo {
    word: string;
    forms: WordForm[] = [];
    synonyms: string[] = [];
    antonyms: string[] = [];
    definition: string = '';
    sentences: string[] = [];
    roots: WordRoot[] = [];

    constructor(word: string) {
        this.word = word;
    }
}

export interface Lesson {
    id: number;
    title: string;
    wordinfos: WordInfo[];
    practices: number[];
}

export const LESSON_LOAD = 'LESSON_LOAD';
export const LESSON_LOAD_SUCCESS = 'LESSON_LOAD_SUCCESS';

export type LessonState = {[id: number]: Lesson};

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'save_lesson_local':
        case LESSON_LOAD:
            return {...state,
                [action.lesson.id]: action.lesson
            };
        case LESSON_LOAD_SUCCESS:
            return action.lessons.reduce((s: any, lesson: Lesson) => {
                s[lesson.id] = lesson;
                return s;
            }, {});
        case 'practice_save_local':
            let ns = {...state};
            ns[action.id].practices.push(action.practice.id);
            return ns;
        default:
            return state;
    }
};
