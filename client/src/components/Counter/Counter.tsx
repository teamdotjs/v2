import * as React from 'react';
import './counter.scss';

export interface CounterProps {
  count: number;
  onButtonClick: () => void;
}

const Counter = (props: CounterProps) => {
  return (
    <div>
      <h1>Count: {props.count}</h1>
      <button onClick={props.onButtonClick}>Count</button>
    </div>
  );
};

export default Counter;
