import * as React from 'react';

interface BindingState {
    [s: string]: any;
}

export class BindingComponent<P> extends React.Component<P, BindingState> {
    state: BindingState;

    updateState(valueField: string, ev: any) {
        let field = ev.target.name;
        let value = ev.target[valueField];
        this.setState({
            [field]: value
        });
    }

    bindValue(ev: any) {
        this.updateState('value', ev);
    }
}
export default BindingComponent;