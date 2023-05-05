import React, { useState, createContext, FC } from 'react';

import { PomoModes, TimerModes } from '../common/Const';

interface Props {
    children?: React.ReactNode;
}

export type TimerModesContextType = {
    pomodoroMode: PomoModes,
    timerMode: TimerModes,
    updatePomodoroMode: (pomoMode: PomoModes) => void,
    updateTimerMode: (timerMode: TimerModes) => void,
};

export const TimerModesContext = createContext<TimerModesContextType>({
    pomodoroMode: PomoModes.pomo,
    timerMode: TimerModes.pause,
    updatePomodoroMode: () => {},
    updateTimerMode: () => {},
});

export const TimerModesProvider: FC<Props> = ({ children }) => {
    // useState
    const [pomodoroMode, setPomodoroMode] = useState(PomoModes.pomo);
    const [timerMode, setTimerMode] = useState(TimerModes.pause);

    // functions
    const updatePomodoroMode = (pomoMode: PomoModes) => {
        setPomodoroMode(pomoMode);
    };

    const updateTimerMode = (timerMode: TimerModes) => {
        setTimerMode(timerMode);
    };

    return (
        <TimerModesContext.Provider value={{ pomodoroMode,
                                        timerMode,
                                        updatePomodoroMode,
                                        updateTimerMode,
                                    }}>
            {children}
        </TimerModesContext.Provider>
    );
};