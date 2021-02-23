import React from 'react';
import secondsToMinutes from 'utils/seconds-to-minutes';

type ButtonProps = {
  mainTime: number;
};

function TimerPomorodo({ mainTime }: ButtonProps): JSX.Element {
  return <div className="timer">{secondsToMinutes(mainTime)}</div>;
}

export default TimerPomorodo;
