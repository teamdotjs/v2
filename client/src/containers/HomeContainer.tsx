import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { createLesson } from '../actions/lesson';

function mapStateToProps(_state: State): HomeProps {
    return {};
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        onCreateLessonClick: () => {
            dispatch(createLesson());
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
