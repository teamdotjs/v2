export interface ExampleAction {
    type: 'Example';
    value: number;
}

export function exampleAction(n: number): ExampleAction {
    return {
        type: 'Example',
        value: n
    };
}



