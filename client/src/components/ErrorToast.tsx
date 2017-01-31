import * as React from 'react';
import {
    Snackbar
} from 'material-ui';

export interface ErrorToastProps {
    error?: string;
    clearError?: (error?: string) => void;
}

const ErrorToast = (props: ErrorToastProps) => {
    return (
        <div>
            <Snackbar
                open={props.error !== undefined}
                message={props.error || 'No Error'}
                autoHideDuration={10000}
                onRequestClose={ () => {
                if (props.clearError) {
                    props.clearError(props.error);
                }
            }}
            />
        </div>
    );
};

export default ErrorToast;
