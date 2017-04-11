import { connect } from 'react-redux';
import { State } from '../reducers/index';
import Course, { CourseProps } from '../components/Course';

function mapStateToProps(_state: State): CourseProps {
    return {

    };
}

function mapDispatchToProps(_dispatch: any): {} {
    return {

    };
}

const CourseContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Course);

export default CourseContainer;
