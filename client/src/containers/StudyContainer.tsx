import { connect } from 'react-redux';
import { Study, StudyProps } from '../components/Lesson/Study';
import { State } from '../reducers/index';
import { loadLesson } from '../actions/lesson';
import { loadPractice } from '../actions/practice';
import { isLoading } from '../actions/util';
import { push } from 'react-router-redux';

function mapStateToProps(state: State, props: any): Partial<StudyProps>  {
    return {
        lesson: state.lesson[props.params.id],
        loading: isLoading('LESSON', state.loading),
        userId: state.session.user === undefined ? undefined : state.session.user.id,
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadLesson(ownProps.params.id));
    dispatch(loadPractice(ownProps.params.id));
    return {
        onClickEdit() {
            dispatch(push(`/lesson/${ownProps.params.id}/edit`));
        },
        takePractice(id: number) {
            dispatch(push(`/lesson/${ownProps.params.id}/take/${id}`));
        }
    };
}

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Study);

export default StudyContainer;
