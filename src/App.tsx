import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

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
    <Router>
      <TaskProvider>
      <TimerProvider>
      <AlarmProvider>
      <TimerModesProvider>
        <Routes>
          <Route path="/" element={
                        <div className="App">
                        <Header />
                        <PomodoroTimer />
                        <TasksList />
                      </div>
          
          } />
        </Routes>
      </TimerModesProvider>
      </AlarmProvider>
      </TimerProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;
