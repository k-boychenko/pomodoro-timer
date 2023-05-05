import React, { useContext } from 'react';

import { TimerModesContext, TimerModesContextType } from '../../context/TimerModesContext';
import { PomoModes } from '../../common/Const';

interface IProgressBar {
    progress: number;
    center?: number;
    strokeWidth?: number;
    fill?: string;
    trackColor?: string;
    indicationColor?: string;
}

const ProgressBar = (props: IProgressBar) => {
    const { pomodoroMode } = useContext(TimerModesContext) as TimerModesContextType;

    let {
        progress = 0,
        center = 100,
        strokeWidth = 10,
        fill = "none",
        trackColor = "#ddd",
        indicationColor = 
            pomodoroMode === PomoModes.pomo 
            ? "var(--clr-accent-100)"
            : pomodoroMode === PomoModes.shortBreak
            ? "var(--clr-short-break-accent-100)"
            : "var(--clr-long-break-accent-100)"
    } = props;
    
    const radius = center - strokeWidth;
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - progress) / 100);
 

    return (
        <svg className='pomodoro-timer pomodoro-svg svg-indicator'>
            <circle
                className="svg-indicator-track"
                cx={center}
                cy={center}
                r={radius}
                fill={fill}
                strokeWidth={strokeWidth}
                stroke={trackColor}
            />
            <circle
                className="svg-indicator-indication"
                cx={center}
                cy={center}
                r={radius}
                fill={fill}
                strokeWidth={strokeWidth}
                stroke={indicationColor}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default ProgressBar;