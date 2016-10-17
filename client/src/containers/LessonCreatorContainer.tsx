import { connect } from 'react-redux';
import LessonCreator from '../components/Lesson/LessonCreator';
import { Lesson } from '../reducers/lessonReducer';
import { State } from '../reducers/index';
import { saveLesson } from '../actions/lesson';

function mapStateToProps(state: State, props: any): any  {
    return {
        notFound: !(props.params.id in state.lesson),
        value: state.lesson[props.params.id]
    };
}

function mapDispatchToProps(dispatch: any): any {
    return {
        onChange: (lesson: Lesson) => {
            dispatch(saveLesson(lesson));
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LessonCreator);

export default HomeContainer;
