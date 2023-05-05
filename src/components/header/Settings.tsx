import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { Switch, NativeSelect, Slider } from "@mui/material";
import { GrClose } from "react-icons/gr";
import { IoIosTimer, IoIosAlarm } from "react-icons/io";

// imoprt components
import Modal from "../common/Modal";
import { TimerContext, TimerContextType } from '../../context/TimerContext';
import { AlarmContext, AlarmContextType } from '../../context/AlarmContext';

import '../../style/settings.css'

interface Props {
    isOpen: boolean;
    toggle: () => void;
}

enum Tabs {
    settings,
    alarm
}

const Settings = (props: Props) => {

    // useContext
    const {pomodoro, shortBreak, longBreak, 
            autoStartBreaks, autoStartPomos, longBreakInterval,
            updateTimerSettings} 
                = useContext(TimerContext) as TimerContextType;
    const {playAlarm, alarmSound, playTicking, volume, 
            updateAlarmSettings} = useContext(AlarmContext) as AlarmContextType;

    // useState
    const [openTab, setOpenTab] = useState(Tabs.settings);
    /** timer */
    const [pomoTime, setPomoTime] = useState(pomodoro);
    const [shortBreakTime, setShortBreakTime] = useState(shortBreak);
    const [longBreakTime, setLongBreakTime] = useState(longBreak);
    const [autoStartBreaksFlg, setAutoStartBreaksFlg] = useState(autoStartBreaks);
    const [autoStartPomosFlg, setAutoStartPomosFlg] = useState(autoStartPomos);
    const [longBreakIntervalNum, setLongBreakIntervalNum] = useState(longBreakInterval);
    /** alarm */
    const [playAlarmSound, setPlayAlarmSound] = useState(playAlarm);
    const [alarmSoundName, setAlarmSoundName] = useState(alarmSound);
    const [playTickingSound, setPlayTickingSound] = useState(playTicking);
    const [volumeLvl, setVolumeLvl] = useState(volume);

    // useEffect
    useEffect(() => {
        if (!props.isOpen) {
            // initialize the settings
            setPomoTime(pomodoro);
            setShortBreakTime(shortBreak);
            setLongBreakTime(longBreak);
            setAutoStartBreaksFlg(autoStartBreaks);
            setAutoStartPomosFlg(autoStartPomos);
            setLongBreakIntervalNum(longBreakInterval);
            setOpenTab(Tabs.settings);
            setPlayAlarmSound(playAlarm);
            setAlarmSoundName(alarmSound);
            setPlayTickingSound(playTicking);
            setVolumeLvl(volume);
        }
        return;
    }, [props.isOpen, 
        pomodoro, 
        shortBreak, 
        longBreak, 
        autoStartBreaks, 
        autoStartPomos, 
        longBreakInterval,
        playAlarm,
        alarmSound,
        playTicking,
        volume
    ]);

    // validate
    const isFloat = (num: string) => {
        if (!num) return true;
        if (Number.isNaN(parseFloat(num))) return false;
        return true;
    }
    const isInt = (num: string) => {
        console.log(num);
        if (!num) return true;
        if (Number.isNaN(parseInt(num))) return false;
        return true;
    }

    // handle
    const handlePomoTimeOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!isFloat(event.currentTarget.value)) return;
        setPomoTime(parseFloat(event.currentTarget.value));
    };
    
    const handleShortBreakTimeOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!isFloat(event.currentTarget.value)) return;
        setShortBreakTime(parseFloat(event.currentTarget.value));
    };
    
    const handleLongBreakTimeOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!isFloat(event.currentTarget.value)) return;
        setLongBreakTime(parseFloat(event.currentTarget.value));
    };
    
    const handleAutoStartBreaksOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setAutoStartBreaksFlg(!autoStartBreaksFlg);
    }

    const handleAutoStartPomosOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setAutoStartPomosFlg(!autoStartPomosFlg);
    }

    const handleLongBreakIntervalOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!isInt(event.currentTarget.value)) return;
        setLongBreakIntervalNum(parseInt(event.currentTarget.value));
    };

    const handlePlayAlarmSoundOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayAlarmSound(!playAlarmSound);
    }

    const handleAlarmSoundNameOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setAlarmSoundName(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }

    const handlePlayTickingSoundOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPlayTickingSound(!playTickingSound);
    }

    const handleVolumeLvlOnChange = (event: Event, value: number | number[], activeThumb: number) => {
        const vol = Array.isArray(value) ? value[0] : value;
        setVolumeLvl(vol);
    }

    const handleSaveButtonOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        saveTimerSettings();

        props.toggle();
    }

    // functions
    const saveTimerSettings = () => {
        updateTimerSettings({
            pomodoro: pomoTime,
            shortBreak: shortBreakTime,
            longBreak: longBreakTime,
            autoStartBreaks: autoStartBreaksFlg,
            autoStartPomos: autoStartPomosFlg,
            longBreakInterval: longBreakIntervalNum,
        });
        updateAlarmSettings({
            playAlarm: playAlarmSound,
            alarmSound: alarmSoundName,
            playTicking: playTickingSound,
            volume: volumeLvl
        });
    }
    

    const setts = (
        <form className="settings-form" onSubmit={handleSaveButtonOnClick}>
            <div className="settings-header align-inline">
                <h3 className={`settings-tab ${openTab===Tabs.settings ? 'active' : ''}`} onClick={() => setOpenTab(Tabs.settings)}>
                    <IoIosTimer/> Timer
                </h3>
                <h3 className={`settings-tab ${openTab===Tabs.alarm ? 'active' : ''}`} onClick={() => setOpenTab(Tabs.alarm)}>
                    <IoIosAlarm/> Alarm
                </h3>
                <div className="close-btn">
                    <GrClose onClick={props.toggle} />
                </div>
            </div>
            {(openTab === Tabs.settings) ? (
                <div className="settings-input">
                <div className="align-inline padding-top-bottom">
                    <div>Pomodoro</div>
                    <input type="number" inputMode="decimal" step="any" name="pomodoro" min="0" value={pomoTime} onChange={handlePomoTimeOnChange} />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Short Break</div>
                    <input type="number" inputMode="decimal" step="any" name="shortBreak" min="0" value={shortBreakTime} onChange={handleShortBreakTimeOnChange} />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Long Break</div>
                    <input type="number" inputMode="decimal" step="any" name="longBreak" min="0" value={longBreakTime} onChange={handleLongBreakTimeOnChange} />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Auto Start Breaks</div>
                    <Switch 
                        name="autoStartBreaks"
                        checked={autoStartBreaksFlg}
                        onChange={handleAutoStartBreaksOnChange}                
                    />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Auto Start Pomodoros</div>
                    <Switch 
                        name="autoStartPomos"
                        checked={autoStartPomosFlg}
                        onChange={handleAutoStartPomosOnChange}                
                    />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Long Break Interval</div>
                    <input type="number" inputMode="numeric" step="1" name="longBreakInterval" min="0" value={longBreakIntervalNum} onChange={handleLongBreakIntervalOnChange} />
                </div>
            </div>

            )
        : (
            <div className="settings-input">
                <div className="align-inline padding-top-bottom">
                    <div>Volume</div>
                    <Slider
                        value={volumeLvl}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        min={0}
                        max={100}
                        onChange={handleVolumeLvlOnChange}
                    />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Play alarm sound</div>
                    <Switch 
                        name="playAlarmSound"
                        checked={playAlarmSound}
                        onChange={handlePlayAlarmSoundOnChange}                
                    />
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Alarm Sound</div>
                    <NativeSelect
                        defaultValue={alarmSound}
                        inputProps={{
                            name: 'alarm-sound',
                            id: 'alarm-sound'
                        }}
                        onChange={handleAlarmSoundNameOnChange}
                        disabled={!playAlarmSound}
                    >
                        <option value="chime">Chime</option>
                        <option value="bell">Bell</option>
                    </NativeSelect>
                </div>
                <div className="align-inline padding-top-bottom">
                    <div>Play ticking sound</div>
                    <Switch 
                        name="playTickingSound"
                        checked={playTickingSound}
                        onChange={handlePlayTickingSoundOnChange}                
                    />
                </div>
            </div>
        )}

            <div className="settings-footer">
                <input className="modal-btn right-side" 
                    type="submit"
                    value="Save"
                />
            </div>
        </form>
    );

    return (
        <Modal children={setts} isOpen={props.isOpen} toggle={props.toggle} />
    )
}

export default Settings;