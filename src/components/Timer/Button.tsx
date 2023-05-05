import React from 'react';

interface BtnSettings {
    type: string;
    text: string;
    onClick: () => void;
}

const Button = (props:BtnSettings) => {
    let button;
    // memo old: className="inner-btn stop / play / pause"
    switch (props.type) {
        case "stop": {
            button = <div className="inner-btn stop" onClick={props.onClick}>{props.text}</div>;
            break;
        }
        case "play": {
            button = <div className="btn center play" onClick={props.onClick}>{props.text}</div>;
            break;
        }
        case "pause": {
            button = <div className="btn center pause" onClick={props.onClick}>{props.text}</div>;
            break;
        }
        case "skip": {
            button = <div className="btn center skip" onClick={props.onClick}>{props.text}</div>;
            break;
        }
    }

    return(
        // <div className="btn center">
        <>
            { button }
        </>
    );
};

export default Button;