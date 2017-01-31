import { connect } from 'react-redux';
import ErrorToast, { ErrorToastProps } from '../components/ErrorToast';
import { State } from '../reducers/index';

function mapStateToProps(state: State): ErrorToastProps {
    return {
        error: state.errors.errors[0]
    };
}

function mapDispatchToProps(dispatch: any): ErrorToastProps {
    return {
        clearError: (error: string) => {
            dispatch({
                type: 'error_clear_single',
                error
            });
        }
    };
}

const ErrorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorToast);

export default ErrorContainer;
