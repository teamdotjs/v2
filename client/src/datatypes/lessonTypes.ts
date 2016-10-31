export interface WordInfo {
    id?: number;
    word: string;
}

export interface Lesson {
    id: number;
    title: string;
    word_infos: WordInfo[];
}

export type LessonState = {
    [id: number]: Lesson
}
