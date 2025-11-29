import React, { useState, useEffect } from 'react';

const GameOver = ({ won, time, livesUsed, onShare, onTryAgain }) => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            tomorrow.setUTCHours(0, 0, 0, 0); // UTC Midnight

            const diff = tomorrow - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50">
            <h2 className="text-4xl font-bold mb-4 text-center">
                {won ? 'YOU WON!' : 'GAME OVER'}
            </h2>
            {won && (
                <div className="text-center mb-6">
                    <p className="text-xl">Time: {Math.floor(time / 60).toString().padStart(2, '0')}:{Math.floor(time % 60).toString().padStart(2, '0')}</p>
                    <p className="text-xl">Lives Used: {livesUsed}</p>
                </div>
            )}
            <div className="flex flex-col gap-3">
                <button
                    onClick={onShare}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
                >
                    Share Result
                </button>
                {won && (
                    <button
                        onClick={onTryAgain}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
                    >
                        Try Again
                    </button>
                )}
            </div>
            <p className="text-sm text-gray-400 mt-6">Next Froggle in: {countdown}</p>
        </div>
    );
};

export default GameOver;
