import * as React from 'react';

interface BindingState {
    [s: string]: any;
}

export class BindingComponent<P> extends React.Component<P, BindingState> {
    state: BindingState;

    componentStateChange() {

    }

    updateState(stateField: string, valueField: string) {
        return (ev: any) => {
            let value = ev.target[valueField];
            this.setState({
                [stateField]: value
            }, this.componentStateChange.bind(this));
        };
    }

    bindValueToName(ev: any) {
        return this.updateState(ev.target.name, 'value')(ev);
    }
}
export default BindingComponent;