import { ExampleAction } from '../actions/example';

export interface ExampleState {
   sum: number;
};

export function exampleReducer(state: ExampleState, action: ExampleAction) {
    if (state === undefined) return {sum: 10};
   switch (action.type) {
   case 'Example':
      return {
         sum: state.sum + action.value
      };
   default:
      return state;
   }
}

