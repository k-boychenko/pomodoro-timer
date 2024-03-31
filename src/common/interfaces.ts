export interface IUserSettings {
    user_id?: number,
    pomodoro_count: string,
    short_break: string,
    long_break: string,
    auto_start_breaks: boolean,
    auto_start_pomodoros: boolean,
    long_break_interval: boolean,
    alarm_volume: number,
    play_alarm_sound: true,
    alarm_sound: number,
    play_ticking_sound: boolean
};