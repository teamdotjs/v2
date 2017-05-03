import { connect } from 'react-redux';
import { PracticeSelector, PracticeSelectorProps} from '../components/Lesson/PracticeSelector';
import { State } from '../reducers/index';
import { push } from 'react-router-redux';
import { isLoading } from '../actions/util';


function mapStateToProps(state: State, props: any): Partial<PracticeSelectorProps> {
    let practices = state.lesson[props.lessonId] === undefined ? [] :
        state.lesson[props.lessonId].practices.map((id: number) => state.practice[id])
                                               .filter(p => p !== undefined);
    return {
        practices,
        loading: isLoading('PRACTICE', state.loading),
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    return {
        onLoad() {
        },
        takePractice(id: number) {
            dispatch(push(`/lesson/${ownProps.lessonId}/take/${id}`));
        }
    };
}

const PracticeSelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PracticeSelector);

export default PracticeSelectorContainer;
