import { connect } from 'react-redux';
import { loadCourseGradeSummaries } from '../actions/grade';
import CourseGrades from '../components/CourseGrades';
import { State } from '../reducers/index';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State, props: any): any  {
    return {
        grades: state.courseGradeSummary[props.params.id],
        loading: isLoading('GRADE', state.loading)
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadCourseGradeSummaries(ownProps.params.id));
    return {};
}

const CourseGradesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseGrades);

export default CourseGradesContainer;
