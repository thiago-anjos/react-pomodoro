import React from 'react';
import PomodoroTimer from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1}
        shortRestTime={1}
        longRestTime={1}
        cycles={4}
      />
    </div>
  );
}

export default App;
