import React, { useState } from 'react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        const audio = new Audio('http://localhost:3017/api/SpeechFromText');

        audio.onended = () => {
            setIsPlaying(false);
        };

        audio.play();
        setIsPlaying(true);
    };

    return (
        <div>
            <h1>MP3 Player</h1>
            <button onClick={toggleAudio} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
                {isPlaying ? 'Playing' : 'Play'}
            </button>
        </div>
    );
};

export default AudioPlayer;
