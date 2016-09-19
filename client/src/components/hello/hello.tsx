import * as React from 'react';
import './hello.scss';

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Goodbye from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
