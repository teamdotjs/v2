import * as React from 'react';

export class BindingComponent<P, S> extends React.Component<P, S> {
    state: S;

    componentStateChange() {

    }

    updateState<K extends keyof S>(stateField: K) {
        return (value: S[K]) => {
            this.setState({
                [stateField as string]: value
            } as any, this.componentStateChange.bind(this));
        };
    }

    bindValueToName(ev: any) {
        return this.updateState(ev.target.name)(ev.target.value);
    }
}
export default BindingComponent;
