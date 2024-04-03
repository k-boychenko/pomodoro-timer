import React, { useState, createContext, FC } from "react";

import chime from "../sounds/bell-chime.wav";

interface Props {
  children?: React.ReactNode;
}

enum AlarmSounds {
  chime,
  bell,
}

interface IAlarmContext {
  playAlarm: boolean;
  alarmSound: AlarmSounds;
  playTicking: boolean;
  volume: number;
}

export type AlarmContextType = {
  playAlarm: boolean;
  alarmSound: AlarmSounds;
  playTicking: boolean;
  volume: number;
  updatePlayAlarm: (play: boolean) => void;
  updateAlarmSound: (sound: AlarmSounds) => void;
  updatePlayTicking: (play: boolean) => void;
  updateVolume: (volume: number) => void;
  updateAlarmSettings: (settings: IAlarmContext) => void;
};

export const AlarmContext = createContext<AlarmContextType>({
  playAlarm: true,
  alarmSound: AlarmSounds.chime,
  playTicking: false,
  volume: 50,
  updatePlayAlarm: () => {},
  updateAlarmSound: () => {},
  updatePlayTicking: () => {},
  updateVolume: () => {},
  updateAlarmSettings: () => {},
});

export const AlarmProvider: FC<Props> = ({ children }) => {
  // localStorage
  const settingsLS = localStorage.getItem("settings");
  const settingsObj = settingsLS ? JSON.parse(settingsLS).alarm : "";

  // useState
  const [playAlarm, setPlayAlarm] = useState(settingsObj.playAlarmSound);
  const [alarmSound, setAlarmSound] = useState(settingsObj.alarmSoundName);
  const [playTicking, setPlayTicking] = useState(settingsObj.playTickingSound);
  const [volume, setVolume] = useState(settingsObj.volumeLvl);

  // functions
  const updatePlayAlarm = (play: boolean) => {
    setPlayAlarm(play);
  };

  const updateAlarmSound = (sound: AlarmSounds) => {
    setAlarmSound(sound);
  };

  const updatePlayTicking = (play: boolean) => {
    setPlayTicking(play);
  };

  const updateVolume = (volume: number) => {
    setVolume(volume);
  };

  const updateAlarmSettings = (settings: IAlarmContext) => {
    updatePlayAlarm(settings.playAlarm);
    updateAlarmSound(settings.alarmSound);
    updatePlayTicking(settings.playTicking);
    updateVolume(settings.volume);
  };

  return (
    <AlarmContext.Provider
      value={{
        playAlarm,
        alarmSound,
        playTicking,
        volume,
        updatePlayAlarm,
        updateAlarmSound,
        updatePlayTicking,
        updateVolume,
        updateAlarmSettings,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};
