import React, { useEffect, useState } from 'react';
import useInterval from 'hooks/use-interval';
import ButtonPomorodo from './button';
import TimerPomorodo from './timer';

type PomodoroPropsType = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

function PomodoroTimer({
  pomodoroTime,
  shortRestTime,
  longRestTime,
}: PomodoroPropsType): JSX.Element {
  const [mainTime, setMainTime] = useState(pomodoroTime);

  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
  };

  const configureResting = (long: boolean) => {
    setResting(true);
    setWorking(false);
    if (long) {
      setMainTime(longRestTime);
    } else {
      setMainTime(shortRestTime);
    }
  };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  return (
    <div className="pomodoro">
      <h2>You are: Working</h2>
      <TimerPomorodo mainTime={mainTime} />
      <div className="controls">
        <ButtonPomorodo title="Work" onClick={configureWork} />
        <ButtonPomorodo
          title="Resting"
          onClick={() => configureResting(false)}
        />
        <ButtonPomorodo
          className={!working && !resting ? 'hidden' : ' '}
          title={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Testando: jsdhfsfljdsklfjdslfjsdlfj</p>
        <p>Testando: jsdhfsfljdsklfjdslfjsdlfj</p>
        <p>Testando: jsdhfsfljdsklfjdslfjsdlfj</p>
        <p>Testando: jsdhfsfljdsklfjdslfjsdlfj</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
