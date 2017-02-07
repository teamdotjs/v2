import { connect } from 'react-redux';
import LessonCreator from '../components/Lesson/LessonCreator';
import { Lesson } from '../reducers/lessonReducer';
import { SectionType } from '../reducers/practiceReducer';
import { State } from '../reducers/index';
import { saveLesson, loadLesson } from '../actions/lesson';
import { loadPractice, generatePractice } from '../actions/practice';

function mapStateToProps(state: State, props: any): any  {
    let practices = state.lesson[props.params.id] === undefined ? [] :
        state.lesson[props.params.id].practices.map((id: number) => state.practice[id])
                                               .filter(p => p !== undefined);
    return {
        notFound: !(props.params.id in state.lesson),
        value: state.lesson[props.params.id],
        lessonId: props.params.id,
        practices,
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadLesson(ownProps.params.id));
    dispatch(loadPractice(ownProps.params.id));
    return {
        loadLession: () => {
            dispatch(loadLesson(ownProps.params.id));
            dispatch(loadPractice(ownProps.params.id));
        },
        onChange: (lesson: Lesson) => {
            dispatch(saveLesson(lesson));
        },
        getPractice: (lessonId: number) => {
            dispatch(loadPractice(lessonId));
        },
        generatePractice: (type: SectionType) => {
            dispatch(generatePractice(ownProps.params.id, type));
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonCreator);

export default HomeContainer;
