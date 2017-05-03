import { connect } from 'react-redux';
import { loadUserGradeSummaries } from '../actions/grade';
import UserGrades from '../components/UserGrades';
import { State } from '../reducers/index';
import { isLoading } from '../actions/util';

function mapStateToProps(state: State): any  {
    return {
        grades: state.lessonGradeSummary.grades,
        loading: isLoading('GRADE', state.loading)
    };
}

function mapDispatchToProps(dispatch: any): any {
    dispatch(loadUserGradeSummaries());
    return {};
}

const UserGradesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserGrades);

export default UserGradesContainer;
