import { connect } from 'react-redux';
import Counter from '../components/Counter/Counter';
import { exampleAction } from '../actions/example';
import { ExampleState } from '../reducers/exampleReducer';

function mapStateToProps(state: ExampleState) {
    return {
        count: state.sum
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        onButtonClick: () => {
            dispatch(exampleAction(1));
        }
    };
}

const SmartCounter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default SmartCounter;
