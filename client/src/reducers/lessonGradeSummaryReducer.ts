export interface LessonGradeSummary {
    id: number;
    title: string;
    grade_summaries: GradeAggregate[];
}

export interface GradeAggregate {
    type: string;
    total_correct: number;
    total_questions: number;
}

export interface LessonGradeSummaryState {
    grades: LessonGradeSummary[];
}

export const lessonGradeSummaryReducer = (state: LessonGradeSummaryState, action: any): LessonGradeSummaryState => {
    if (state === undefined) return { grades: [] };
    switch (action.type) {
        case 'load_user_grade_summaries':
            return { grades: action.grades };
        default:
            return state;
    }
};