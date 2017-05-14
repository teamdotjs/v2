import { connect } from 'react-redux';
import { loadCourseStudents, addStudent } from '../actions/course';
import CourseStudents from '../components/CourseStudents';
import { State } from '../reducers/index';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State, props: any): any  {
    return {
        students: state.courseStudent[props.params.id],
        loading: isLoading('STUDENTS', state.loading)
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadCourseStudents(ownProps.params.id));
    return {
        addStudent: (email: string) => {
            dispatch(addStudent(ownProps.params.id, email));
        }
    };
}

const CourseStudentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseStudents);

export default CourseStudentsContainer;
