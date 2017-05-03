import * as React from 'react';
import { connect } from 'react-redux';
import { SinglePracticeTaker, SinglePracticeTakerProps} from '../components/Lesson/SinglePracticeTaker';
import { State } from '../reducers/index';
import { push } from 'react-router-redux';
import { isLoading } from '../actions/util';
import Page from '../components/util/Page';

function mapStateToProps(state: State, props: any): Partial<SinglePracticeTakerProps> {
    let practices = state.lesson[props.lessonId] === undefined ? [] :
        state.lesson[props.lessonId].practices.map((id: number) => state.practice[id])
                                               .filter(p => p !== undefined);
    return {
        practice: practices[props.params.pid],
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

const Paged = (props: SinglePracticeTakerProps) => <Page><SinglePracticeTaker {...props} /></Page>; 

const SinglePracticeTakerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Paged);

export default SinglePracticeTakerContainer;
