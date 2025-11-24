import React from 'react';

const WastedOverlay = ({ onComplete }) => {
    return (
        <div
            onClick={onComplete}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-50 cursor-pointer"
        >
            <h2 className="text-4xl font-bold mb-4 text-center text-red-500">
                WASTED
            </h2>
            <p className="text-xl animate-pulse">
                Tap or click to retry
            </p>
        </div>
    );
};

export default WastedOverlay;
