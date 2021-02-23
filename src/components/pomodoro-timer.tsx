import React, { useCallback, useEffect, useState } from 'react';
import useInterval from 'hooks/use-interval';
import ButtonPomorodo from './button';
import TimerPomorodo from './timer';
import secondsTotime from 'utils/seconds-to-minutes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('assets/sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('assets/sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  cycles,
}: PomodoroPropsType): JSX.Element {
  const [mainTime, setMainTime] = useState(pomodoroTime);

  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  const initCycles = new Array(cycles - 1).fill(true);

  const [cyclesState, setCycleState] = useState(initCycles);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }, [setWorking, setResting, setMainTime, pomodoroTime]);

  const configureResting = useCallback(
    (long: boolean) => {
      setResting(true);
      setWorking(false);
      if (long) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }
      audioStopWorking.play();
    },
    [setResting, setWorking, longRestTime, shortRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;

    if (working && cyclesState.length > 0) {
      configureResting(false);
      cyclesState.pop();
    } else if (working && cyclesState.length <= 0) {
      configureResting(true);
      setCycleState(initCycles);
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    configureResting,
    setCycleState,
    numberOfPomodoros,
    cyclesState,
  ]);

  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'Working' : 'Resting'}</h2>
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
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas Trabalhadas: {secondsTotime(fullWorkingTime)}</p>
        <p>Número de pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
