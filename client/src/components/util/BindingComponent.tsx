import * as React from 'react';

interface BindingState {
    [s: string]: any;
}

export class BindingComponent<P> extends React.Component<P, BindingState> {
    state: BindingState;

    updateState(stateField: string, valueField: string) {
        return (ev: any) => {
            let value = ev.target[valueField];
            this.setState({
                [stateField]: value
            });
        };
    }

    bindValueToName(ev: any) {
        return this.updateState(ev.target.name, 'value')(ev);
    }
}
export default BindingComponent;