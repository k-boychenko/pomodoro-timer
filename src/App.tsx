import React from 'react';

// import components
import Header from './components/header/Header';
import PomodoroTimer from './components/Timer/PomodoroTimer';
import TasksList from './components/Tasks/TasksList';

import { TaskProvider } from './context/TaskContext';
import { TimerProvider } from './context/TimerContext';
import { AlarmProvider } from './context/AlarmContext';
import { TimerModesProvider } from './context/TimerModesContext';

import './style/App.css';
import './style/modal.css';
import './style/colorSchemes.css'

function App() {
  return (
    <TaskProvider>
    <TimerProvider>
    <AlarmProvider>
    <TimerModesProvider>
      <div className="App">
        <Header />
        <PomodoroTimer />
        <TasksList />
      </div>
    </TimerModesProvider>
    </AlarmProvider>
    </TimerProvider>
    </TaskProvider>
  );
}

export default App;
