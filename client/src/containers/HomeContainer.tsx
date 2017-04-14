import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { loadCourses } from '../actions/course';
import { push } from 'react-router-redux';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State): HomeProps {
    return {
        courses: Object.keys(state.course).map((idx: any) => state.course[idx]),
        loading: isLoading('COURSE', state.loading),
    };
}

function mapDispatchToProps(dispatch: any): {} {
    // Note, loads lesson on every vist of Home
    dispatch(loadCourses());
    return {
        onClickCourse: (id: number) => {
            dispatch(push('/course/' + id));
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
