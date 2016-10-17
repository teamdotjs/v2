import * as React from 'react';

interface BindingState {
    [s: string]: any;
}

export class BindingComponent<P> extends React.Component<P, BindingState> {
    state: BindingState;

    updateState(stateField: string) {
        return (value: any) => {
            this.setState({
                [stateField]: value
            });
        };
    }

    bindValueToName(ev: any) {
        return this.updateState(ev.target.name)(ev.target.value);
    }
}
export default BindingComponent;