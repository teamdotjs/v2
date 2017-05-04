import { UPDATE_QUESTION } from '../actions/practiceTaker';
export interface TakingState {
  [id: number]: {
    [question: number]: number | string;
  };
};

export const takingReducer = (state: TakingState, action: any): TakingState => {
  if (state === undefined) return {};
  switch (action.type) {
    case UPDATE_QUESTION:
      return {
        ...state,
        [action.practice]: {
          ...state[action.practice],
          [action.question]: action.newValue,
        },
      };
    default:
      return state;
  }
};
