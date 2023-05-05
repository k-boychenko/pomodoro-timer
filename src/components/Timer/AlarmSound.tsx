import Sound from 'react-sound';

import { PlayStatus } from '../../common/Const';

interface SoundSettings {
    url: string,
    playStatus: PlayStatus,
    volume?: number,
    onFinishedPlaying?: () => void
};

const AlarmSound = (props: SoundSettings) => {
    return (
        <Sound
            url={props.url}
            playStatus={props.playStatus}
            volume={props.volume}
            onFinishedPlaying={props.onFinishedPlaying}
        />
    );
}

export default AlarmSound;