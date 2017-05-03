import { State } from '../reducers';

export const UPDATE_QUESTION = 'UPDATE_QUESTION';

export function updateLocalAnswer(practice: number, newValue: any, question: number) {
  return (dispatch: any) => {
    return dispatch({
      type: UPDATE_QUESTION,
      practice,
      question,
      newValue,
    });
  };
}

export function submitPractice(id: number) {
  return (_dispatch: any, getState: () => State) => {
    const practice = getState().practiceTaking[id];
    console.log(practice);
  };
}