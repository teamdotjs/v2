import { connect } from 'react-redux';
import Study from '../components/Lesson/Study';
import { State } from '../reducers/index';
import { loadLesson } from '../actions/lesson';
import { isLoading } from '../actions/util';
import { push } from 'react-router-redux';

function mapStateToProps(state: State, props: any): any  {
    return {
        lesson: state.lesson[props.params.id],
        loading: isLoading('LESSON', state.loading),
        userId: state.session.user === undefined ? undefined : state.session.user.id
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    dispatch(loadLesson(ownProps.params.id));
    return {
        onClickEdit() {
            dispatch(push(`/lesson/${ownProps.params.id}/edit`));
        }
    };
}

const StudyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Study);

export default StudyContainer;
