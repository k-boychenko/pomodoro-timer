import React, { useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

// import components
import TimerButtons from './TimerButtons';
import ProgressBar from './ProgressBar';
import { TaskContext, TaskContextType } from '../../context/TaskContext';
import { TimerContext, TimerContextType } from '../../context/TimerContext';
import { AlarmContext, AlarmContextType } from '../../context/AlarmContext';
import { TimerModesContext, TimerModesContextType } from '../../context/TimerModesContext';
import { TimerModes, PomoModes, TimerTitles, ToastMessages, PlayStatus } from '../../common/Const';
import AlarmSound from './AlarmSound';

import chime from '../../sounds/bell-chime.wav'

const PomodoroTimer = () => {
    //useContext
    const { currentTask, updateCompletedPomosNo, updatePomosNo } = useContext(TaskContext) as TaskContextType;
    const { pomodoro, shortBreak, longBreak, 
            autoStartBreaks, autoStartPomos, longBreakInterval } = useContext(TimerContext) as TimerContextType;
    const { playAlarm, alarmSound, playTicking, volume } = useContext(AlarmContext) as AlarmContextType;
    const { pomodoroMode, timerMode, updatePomodoroMode, updateTimerMode } = useContext(TimerModesContext) as TimerModesContextType;

    //useState
    const [time, setTime] = useState({
            minutes: Math.trunc(pomodoro), 
            seconds: (pomodoro * 60) % 60
        });
    const [pomoCount, setPomoCount] = useState(0);
    const [countToInterval, setCountToInterval] = useState(0);
    const [timerTitle, setTimerTitle] = useState((TimerTitles.pomodoro).toString());
    const [progress, setProgress] = useState(100);
    const [toast, setToast] = useState({
        open: false,
        message: ''
    });
    const [alarmPlayStatus, setAlarmPlayStatus] = useState(PlayStatus.stopped);

    const intervalId = React.useRef<NodeJS.Timer>();

    // useEffect
    useEffect(() => {
        if (timerMode === TimerModes.play) {
            intervalId.current = setInterval(() => {
                if (time.seconds === 0) {
                    if (time.minutes === 0) { 
                        switchBetweenBreaksAndPomos();
                        setAlarmPlayStatus(PlayStatus.playing);
                        return;
                    }
                    setTime({
                        minutes: time.minutes-1,
                        seconds: 59
                    });
                } else {
                    setTime({
                        minutes: time.minutes,
                        seconds: time.seconds-1
                    });
                }
                calculateProgress();
            }, 1000);
        } else if (timerMode === TimerModes.pause && intervalId.current) {
            clearInterval(intervalId.current);
        }
        return () => clearInterval(intervalId.current);
    });

    // functions
    const switchBetweenBreaksAndPomos = () => {
        clearInterval(intervalId.current);
        setProgress(100);
        if (pomodoroMode === PomoModes.pomo) {
            // pomo → short/long break
            setPomoCount(pomoCount+1);
            setCountToInterval(countToInterval+1);
            
            // update completed pomos of current Task
            // if (currentTask !== 0) {
                updateCompletedPomosNo(currentTask);
                updatePomosNo(currentTask, -1);
            // }

            if (countToInterval+1 < longBreakInterval) {
                // short break
                setPomodoroMode(PomoModes.shortBreak);
                updateTimerTitle(TimerTitles.shortBreak);
                updateTime(shortBreak);

                setToast({open: true, message: ToastMessages.shortBreak});
            } else {
                // long break
                setPomodoroMode(PomoModes.longBreak);
                updateTimerTitle(TimerTitles.longBreak);
                updateTime(longBreak);
                setCountToInterval(0);

                setToast({open: true, message: ToastMessages.longBreak});
            }
            if (autoStartBreaks) {
                updateTimerMode(TimerModes.play);
            } else {
                updateTimerMode(TimerModes.pause);
            }
        } else {
            // short/long break → pomo
            setPomodoroMode(PomoModes.pomo);
            updateTimerTitle(TimerTitles.pomodoro);
            updateTime(pomodoro);

            setToast({open: true, message: ToastMessages.pomodoro});

            if (autoStartPomos) {
                updateTimerMode(TimerModes.play);
            } else {
                updateTimerMode(TimerModes.pause);
            }
        }
    }

    const setPomodoroMode = (mode: PomoModes) => {
        updatePomodoroMode(mode);
    }

    const updateTimerTitle = (title: TimerTitles) => {
        switch (title) {
            case TimerTitles.pomodoro: 
                setTimerTitle(title);
                break;
            case TimerTitles.shortBreak:
            case TimerTitles.longBreak:
                setTimerTitle("Take a " + title);
        }
    }

   const updateTime = (time: number) => {
        setTime({
            minutes: Math.trunc(time),
            seconds: (time * 60) % 60
        });
   }
    
    const calculateProgress = () => {
        const curTime = time.minutes * 60 + time.seconds - 1;
        let fulltime = 0;
        switch (pomodoroMode) {
            case PomoModes.pomo:
                fulltime = pomodoro * 60; 
                break;
            case PomoModes.shortBreak:
                fulltime = shortBreak * 60; 
                break;
            case PomoModes.longBreak:
                fulltime = longBreak * 60; 
                break;
        }
        setProgress(curTime / fulltime * 100);
    }

    // handlers
    const handleTimerStart = () => {
        updateTimerMode(TimerModes.play);
    };

    const handleTimerPause = () => {
        updateTimerMode(TimerModes.pause);
    };

    const handleTimerSkip = () => {
        switchBetweenBreaksAndPomos();
    };

    return (
        <section className='timer-container'>
            <div className={`container center ${pomodoroMode}`}>
                <div className='timer'>
                    <div className='timer-title center'>
                        {timerTitle}
                    </div>
                    <div className='timer-title center'>
                        #{pomoCount}
                    </div>
                    <div className='time-down center'>
                        <p className='time timer-clock'>
                            {String(time.minutes).padStart(2,"0")}:{String(time.seconds).padStart(2,"0")}
                        </p>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            </div>
            <TimerButtons pauseOnClick={handleTimerPause} playOnClick={handleTimerStart} skipOnClick={handleTimerSkip} />

            <Snackbar open={toast.open} autoHideDuration={5000} onClose={() => setToast({open: false, message: ''})}>
                <Alert onClose={() =>  setToast({open: false, message: ''})} severity="info" sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
            <AlarmSound
                url={chime} 
                playStatus={alarmPlayStatus}
                volume={volume}
                onFinishedPlaying={() => setAlarmPlayStatus(PlayStatus.stopped)}
            />
        </section>
    );
};

export default PomodoroTimer;