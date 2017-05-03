import * as React from 'react';
import { connect } from 'react-redux';
import { SinglePracticeTaker, SinglePracticeTakerProps} from '../components/Lesson/SinglePracticeTaker';
import { State } from '../reducers/index';
import { isLoading } from '../actions/util';
import Page from '../components/util/Page';
import { loadPractice } from '../actions/practice';

function mapStateToProps(state: State, props: any): Partial<SinglePracticeTakerProps> {
    return {
        practice: state.practice[props.params.pid],
        loading: isLoading('PRACTICE', state.loading),
    };
}

function mapDispatchToProps(dispatch: any, ownProps: any): any {
    return {
        onLoad() {
            // Load in the lessons practices
            dispatch(loadPractice(ownProps.params.id));
        }
    };
}

const Paged = (props: SinglePracticeTakerProps) => <Page><SinglePracticeTaker {...props} /></Page>; 

const SinglePracticeTakerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Paged);

export default SinglePracticeTakerContainer;
