export interface WordForm {
    word: string;
    part_of_speech: string;
}

export type PartType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection' | 'determiner';

export class WordInfo {
    word: string;
    forms: WordForm[] = [];
    synonyms: string[] = [];
    antonyms: string[] = [];
    definition: string = '';
    sentences: string[] = [];
    part_of_speech: PartType;

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

export type LessonState = {[id: number]: Lesson};

export const parts_of_speech: PartType[] = ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'determiner'];

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'save_lesson_local':
        case 'create_lesson_success':
            return {...state,
                [action.lesson.id]: action.lesson
            };
        case 'load_all_lesssons_success':
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
