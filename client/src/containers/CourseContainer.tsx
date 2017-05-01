import { connect } from 'react-redux';
import {loadCourse, loadCourseLessonSummaries} from '../actions/course';
import { createLesson } from '../actions/lesson';
import { Course } from '../reducers/courseReducer';
import { Course as CourseComp } from '../components/Course';
import { State } from '../reducers/index';
import { CourseProps } from '../components/Course';
import { push } from 'react-router-redux';

function mapStateToProps(state: State, props: any): Partial<CourseProps>  {
    const course: Course | undefined = state.course[props.params.id];
    return course ? {
        is_instructor: state.session.user === undefined ? false : state.session.user.id === course.instructor_id,
        title: course.title,
        // TODO: Be more efficient here
        lessons: Object.keys(state.lessonSummary).map((k: any) => state.lessonSummary[k])
                    .filter(l => l.course_ids.indexOf(course.id) !== -1)
    } : {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadCourseLessonSummaries(ownProps.params.id));
    dispatch(loadCourse(ownProps.params.id));
    return {
        onClickLesson(id: number) {
            dispatch(push('/lesson/' + id));
        },
        onCreateLessonClick() {
            dispatch(createLesson(ownProps.params.id));
        },
        onClickGrades() {
            dispatch(push(`/course/${ownProps.params.id}/grades`));
        }
    };
}

const CourseCreatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseComp);

export default CourseCreatorContainer;
