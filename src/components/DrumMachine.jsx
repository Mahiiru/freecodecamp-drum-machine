import React, { useState, useEffect } from 'react';
import { drums } from './drums';
import { Display } from './Display';
import { DrumPad } from './DrumPad';
import '../stylesheets/DrumMachine.css';

export const DrumMachine = () => {
    const [currentDrumName, setCurrentDrumName] = useState('');
    const audioRefs = drums.reduce((acc, currentDrum) => {
        acc[currentDrum.keyValue] = React.createRef();
        return acc;
    }, {});

    const handleKeyDown = (event) => {
        const drumSelected = drums.find(currentDrum => currentDrum.keyValue === event.key.toUpperCase());
        if (drumSelected) {
            setCurrentDrumName(drumSelected.audioName);
            if(audioRefs[drumSelected.keyValue].current){
                audioRefs[drumSelected.keyValue].current.play();
            }
        }
    }

    const handleDrumClick = (event) => {
        const drumSelected = drums.find(currentDrum => currentDrum.keyValue === event.target.name);
        if (drumSelected) {
            setCurrentDrumName(drumSelected.audioName);
            audioRefs[drumSelected.keyValue].current.play();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className="drum-container" id="drum-machine">
            <Display drumName={currentDrumName} />
            <div className="drum-pads">
                {drums.map(currentDrum => (
                    <DrumPad 
                        key={currentDrum.keyValue} 
                        audioName={currentDrum.keyValue} 
                        audioSrc={currentDrum.audioSource} 
                        onClick={handleDrumClick} 
                        audioRef={audioRefs[currentDrum.keyValue]}
                    />
                ))}
            </div>
        </div>
    );
}