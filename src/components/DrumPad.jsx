import React from 'react';
import '../stylesheets/DrumPad.css';

const DrumPad = (props) => {
    const handleClick = (event) => {
        props.onClick(event);
    }
    return (
        <button className="drum-pad" id={props.audioName} name={props.audioName} onClick={handleClick}>
            {props.audioName}
            <audio ref={props.audioRef} src={props.audioSrc} className="clip" id={props.audioName}/>
        </button>
    );
}

export { DrumPad };