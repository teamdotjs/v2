import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { push } from 'react-router-redux';
import { isLoading } from '../actions/util';
import { createCourse } from '../actions/course';

function mapStateToProps(state: State): HomeProps {
    return {
        courses: Object.keys(state.course).map((idx: any) => state.course[idx]),
        loading: isLoading('COURSE', state.loading),
    };
}



function mapDispatchToProps(dispatch: any): {} {
    return {
        onClickCourse: (id: number) => {
            dispatch(push('/course/' + id));
        },
        onCreateCourseClick: () => {
            dispatch(createCourse());
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
