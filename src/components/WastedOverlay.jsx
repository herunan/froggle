import React from 'react';

const WastedOverlay = ({ onComplete }) => {
    // No auto-dismiss, wait for user interaction

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gray-900/50 backdrop-grayscale animate-flash">

            {/* Wasted Text */}
            <h1 className="relative text-6xl md:text-8xl font-black text-red-600 tracking-widest uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-scale-in font-sans transform -rotate-6 border-4 border-red-600 px-8 py-2 bg-black/30 mb-12">
                WASTED
            </h1>

            {/* Retry Button */}
            <button
                onClick={onComplete}
                className="pointer-events-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-2xl rounded shadow-lg transform hover:scale-105 transition-transform animate-fade-in-delay"
            >
                RETRY
            </button>

            <style jsx>{`
                @keyframes flash {
                    0% { opacity: 0; background-color: white; }
                    10% { opacity: 1; background-color: white; }
                    20% { opacity: 1; background-color: rgba(17, 24, 39, 0.5); }
                    100% { opacity: 1; }
                }
                .animate-flash {
                    animation: flash 2s ease-out forwards;
                }
                @keyframes scale-in {
                    0% { transform: scale(2) rotate(-6deg); opacity: 0; }
                    15% { transform: scale(1) rotate(-6deg); opacity: 1; }
                    100% { transform: scale(1.1) rotate(-6deg); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 2s ease-out forwards;
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.5s ease-out 0.2s forwards;
                }
            `}</style>
        </div>
    );
};

export default WastedOverlay;
