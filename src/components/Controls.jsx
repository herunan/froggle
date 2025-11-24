import React from 'react';

const Controls = ({ onMove }) => {
    // D-pad styling to match the image (Circular with cross)
    const containerClass = "relative w-56 h-56 bg-gray-800 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_-5px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-gray-700";
    const crossClass = "relative w-full h-full";

    // Button base styles - using absolute positioning to form the cross
    const btnBase = "absolute bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-gray-200 flex items-center justify-center text-3xl transition-colors touch-manipulation select-none shadow-[inset_0_2px_5px_rgba(255,255,255,0.1),0_5px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1";

    // Dimensions for the cross arms
    const vArmClass = "w-16 h-20 left-1/2 -translate-x-1/2";
    const hArmClass = "h-16 w-20 top-1/2 -translate-y-1/2";

    return (
        <div className="flex justify-center mt-8 mb-12">
            <div className={containerClass}>
                <div className={crossClass}>
                    {/* Up */}
                    <button
                        className={`${btnBase} ${vArmClass} top-4 rounded-t-xl rounded-b-sm`}
                        onClick={() => onMove('up')}
                        aria-label="Move Up"
                    >
                        ▲
                    </button>

                    {/* Down */}
                    <button
                        className={`${btnBase} ${vArmClass} bottom-4 rounded-b-xl rounded-t-sm`}
                        onClick={() => onMove('down')}
                        aria-label="Move Down"
                    >
                        ▼
                    </button>

                    {/* Left */}
                    <button
                        className={`${btnBase} ${hArmClass} left-4 rounded-l-xl rounded-r-sm`}
                        onClick={() => onMove('left')}
                        aria-label="Move Left"
                    >
                        ◀
                    </button>

                    {/* Right */}
                    <button
                        className={`${btnBase} ${hArmClass} right-4 rounded-r-xl rounded-l-sm`}
                        onClick={() => onMove('right')}
                        aria-label="Move Right"
                    >
                        ▶
                    </button>

                    {/* Center Pivot (Decorative) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-600 rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] pointer-events-none z-10">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-500 to-gray-700 opacity-50 scale-75"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
