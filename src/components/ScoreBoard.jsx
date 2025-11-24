import React from 'react';

const ScoreBoard = ({ livesUsed, time }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-md mb-4 px-4 text-white font-mono">
            <div className="flex gap-1 items-center">
                <span className="text-2xl">❤️</span>
                <span className="text-xl ml-2">{livesUsed}</span>
            </div>
            <div className="text-xl">
                TIME: {time.toFixed(1)}s
            </div>
        </div>
    );
};

export default ScoreBoard;
