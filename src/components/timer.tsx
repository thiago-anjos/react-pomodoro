import React from 'react';
import secondsToTime from 'utils/seconds-to-time';

type ButtonProps = {
  mainTime: number;
};

function TimerPomorodo({ mainTime }: ButtonProps): JSX.Element {
  return <div className="timer">{secondsToTime(mainTime)}</div>;
}

export default TimerPomorodo;
