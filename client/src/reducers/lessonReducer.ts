export interface WordInfo {
    id?: number;
    word: string;
}

export interface Lesson {
    id: number;
    title: string;
    wordinfos: WordInfo[];
}

export type LessonState = {[id: number]: Lesson};

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) return {};
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