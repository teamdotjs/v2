import { connect } from 'react-redux';
import Counter from '../components/Counter/Counter';
import { exampleAction } from '../actions/example';

function mapStateToProps(state: any) {
    return {
        count: state.exampleReducer.sum
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
