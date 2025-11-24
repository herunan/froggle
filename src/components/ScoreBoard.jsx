import React from 'react';

const ScoreBoard = ({ livesUsed, time }) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10); // Get tenths of a second
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;

    return (
        <div className="flex justify-between items-center w-full max-w-[85vw] md:max-w-[500px] px-2 mb-2 text-white">
            <div className="flex items-center gap-2">
                <span className="text-red-500 text-xl">❤️</span>
                <span className="font-mono text-lg">{livesUsed}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-white text-sm uppercase">TIME:</span>
                <span className="font-mono text-lg">{timeStr}s</span>
            </div>
        </div>
    );
};

export default ScoreBoard;
