export interface LessonSummary {
    id: number;
    title: string;
}

export type LessonSummaryState = {[id: number]: LessonSummary};

export const lessonSummaryReducer = (state: LessonSummaryState, action: any): LessonSummaryState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'save_lesson_local':
        case 'create_lesson_success':
            return {...state,
                [action.lesson.id]: action.lesson.title
            };
        case 'load_lesson_summaries_success':
            let newState = {...state};
            action.lessonSummaries.forEach(
                (summ: LessonSummary) => newState[summ.id] = summ
            );
            return newState;
        default:
            return state;
    }
};
