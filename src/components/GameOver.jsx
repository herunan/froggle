import React from 'react';

const GameOver = ({ won, time, livesUsed, onShare }) => {
    return (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50">
            <h2 className="text-4xl font-bold mb-4 text-center">
                {won ? 'YOU WON!' : 'GAME OVER'}
            </h2>
            {won && (
                <div className="text-center mb-6">
                    <p className="text-xl">Time: {time.toFixed(2)}s</p>
                    <p className="text-xl">Lives Used: {livesUsed}</p>
                </div>
            )}
            <button
                onClick={onShare}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg mb-4"
            >
                Share Result
            </button>
            <p className="text-sm text-gray-400">Next Froggle in: ...</p>
        </div>
    );
};

export default GameOver;
