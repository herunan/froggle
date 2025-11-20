import React from 'react';

const ScoreBoard = ({ lives, time }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-md mb-4 px-4 text-white font-mono">
            <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={`text-2xl ${i < lives ? 'opacity-100' : 'opacity-20'}`}>
                        ❤️
                    </span>
                ))}
            </div>
            <div className="text-xl">
                TIME: {time.toFixed(1)}s
            </div>
        </div>
    );
};

export default ScoreBoard;
