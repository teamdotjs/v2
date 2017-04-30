import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { createLesson, loadLessons } from '../actions/lesson';
import { push } from 'react-router-redux';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State): HomeProps {
    return {
        lessons: Object.keys(state.lessonSummary).map((idx: any) => state.lessonSummary[idx]),
        loading: isLoading('LESSON', state.loading),
    };
}

function mapDispatchToProps(dispatch: any): {} {
    // Note, loads lesson on every vist of Home
    dispatch(loadLessons());
    return {
        onCreateLessonClick: () => {
            dispatch(createLesson());
        },
        onClickLesson: (id: number) => {
            dispatch(push('/lesson/' + id));
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
