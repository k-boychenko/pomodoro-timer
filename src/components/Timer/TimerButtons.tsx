import React, { useContext } from 'react';

// import components
import Button from './Button';
import { TimerButtonNames, TimerModes, PomoModes } from '../../common/Const';
import { TimerModesContext, TimerModesContextType } from '../../context/TimerModesContext';

interface ITimerButtons {
    pauseOnClick: () => void;
    playOnClick: () => void;
    skipOnClick: () => void;
};

const TimerButtons = (props: ITimerButtons) => {
    // useContext
    const { pomodoroMode, timerMode } = useContext(TimerModesContext) as TimerModesContextType;

    // handlers
    const handlePauseOnClick = () => {
        props.pauseOnClick();
    };
    const handlePlayOnClick = () => {
        props.playOnClick();
    };
    const handleSkipOnClick = () => {
        props.skipOnClick();
    };

    return(
        <div className={`container align-inline btns ${pomodoroMode}`}>
            {timerMode === TimerModes.pause
                ? <Button type="play" text={TimerButtonNames.start} onClick={handlePlayOnClick} />
                : <Button type="pause" text={TimerButtonNames.pause} onClick={handlePauseOnClick} />
            }
            {pomodoroMode === PomoModes.pomo 
                ? <Button type="skip" text={TimerButtonNames.done} onClick={handleSkipOnClick} />
                : <Button type="skip" text={TimerButtonNames.skip} onClick={handleSkipOnClick} />
            }
        </div>
    );
};

export default TimerButtons;