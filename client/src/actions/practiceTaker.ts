import 'whatwg-fetch';
import { State } from '../reducers';

export const UPDATE_QUESTION = 'UPDATE_QUESTION';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

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
    // Should submit after taken, not all at then end.
    const wait = Object.keys(practice).map((id: any) => {
      return {
        question_id: id,
        value: practice[id],
      };
    })
    .map((payload: any) => {
      return fetch('/api/grade', {
        method: 'POST',
        headers,
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
    });

    Promise.all(wait)
      .then((res: any) => console.log(res));
  };
}