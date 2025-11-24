import React from 'react';

const ScoreBoard = ({ livesUsed, time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;

    return (
        <div className="flex justify-between items-center w-full max-w-md mb-2 px-4 text-white font-mono">
            <div className="flex gap-1 items-center">
                <span className="text-2xl">❤️</span>
                <span className="text-xl ml-2">{livesUsed}</span>
            </div>
            <div className="text-xl">
                ⏱️ {timeStr}
            </div>
        </div>
    );
};

export default ScoreBoard;
