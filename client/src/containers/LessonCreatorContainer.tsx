import { connect } from 'react-redux';
import LessonCreator from '../components/Lesson/LessonCreator';
import { Lesson } from '../reducers/lessonReducer';
import { SectionType } from '../reducers/practiceReducer';
import { State } from '../reducers/index';
import { saveLesson, loadLesson } from '../actions/lesson';
import { loadPractice, generatePractice, deletePractice } from '../actions/practice';

function mapStateToProps(state: State, props: any): any  {
    let practices = state.lesson[props.params.id] === undefined ? [] :
        state.lesson[props.params.id].practices.map((id: number) => state.practice[id])
                                               .filter(p => p !== undefined);
    return {
        value: state.lesson[props.params.id],
        lessonId: props.params.id,
        practices,
        errors: state.errors.pins,
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadLesson(ownProps.params.id));
    dispatch(loadPractice(ownProps.params.id));
    return {
        onChange: (lesson: Lesson) => {
            dispatch(saveLesson(lesson));
        },
        generatePractice: (type: SectionType) => {
            dispatch(generatePractice(ownProps.params.id, type));
        },
        deletePractice: (id: number) => {
            dispatch(deletePractice(id));
        }
    };
}

const LessonCreatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonCreator);

export default LessonCreatorContainer;
