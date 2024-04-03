import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components
import Header from "./components/header/Header";
import PomodoroTimer from "./components/Timer/PomodoroTimer";
import TasksList from "./components/Tasks/TasksList";

import { TaskProvider } from "./context/TaskContext";
import { TimerProvider } from "./context/TimerContext";
import { AlarmProvider } from "./context/AlarmContext";
import { TimerModesProvider } from "./context/TimerModesContext";

import "./style/App.css";
import "./style/modal.css";
import "./style/colorSchemes.css";

function App() {
  // useEffect
  useEffect(() => {
    const todosLS = localStorage.getItem("todos");
    const settingsLS = localStorage.getItem("settings");
    // if there are no localStorage records, add new with default stats
    if (!todosLS) {
      localStorage.setItem("todos", "");
      localStorage.setItem("currentTask", "0");
    }
    if (!settingsLS) {
      enum AlarmSounds {
        chime,
        bell,
      }
      const settingsObj = {
        timer: {
          pomodoroTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15,
          autoStartBreaksFlg: false,
          autoStartPomosFlg: false,
          noOfPomosUntilLongBreak: 2,
        },
        alarm: {
          playAlarmSound: true,
          alarmSoundName: AlarmSounds.chime,
          playTickingSound: false,
          volumeLvl: 50,
        },
      };
      localStorage.setItem("settings", JSON.stringify(settingsObj));
    }
  }, []);

  return (
    <Router>
      <TaskProvider>
        <TimerProvider>
          <AlarmProvider>
            <TimerModesProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="App">
                      <Header />
                      <PomodoroTimer />
                      <TasksList />
                    </div>
                  }
                />
              </Routes>
            </TimerModesProvider>
          </AlarmProvider>
        </TimerProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;
