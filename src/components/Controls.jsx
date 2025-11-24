import React from 'react';

const Controls = ({ onMove }) => {
    // Container rotated 45 degrees to turn the grid into a diamond/circle wedges
    const containerClass = "relative w-48 h-48 bg-gray-900 rounded-full border border-gray-800 overflow-hidden rotate-45";

    // Button base: fills the quadrant, flex center - minimal styling
    const btnBase = "w-full h-full flex items-center justify-center text-3xl text-gray-400 active:text-gray-300 touch-manipulation select-none outline-none bg-gray-900";

    // Icon rotation to counteract container rotation (-45deg)
    const iconClass = "-rotate-45";

    return (
        <div className="flex justify-center mb-4">
            <div className={containerClass}>
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    {/* Top-Left Quadrant -> UP */}
                    <button
                        className={`${btnBase} border-r border-b border-gray-800`}
                        onClick={() => onMove('up')}
                        aria-label="Move Up"
                    >
                        <span className={iconClass}>▲</span>
                    </button>

                    {/* Top-Right Quadrant -> RIGHT */}
                    <button
                        className={`${btnBase} border-b border-gray-800`}
                        onClick={() => onMove('right')}
                        aria-label="Move Right"
                    >
                        <span className={iconClass}>▶</span>
                    </button>

                    {/* Bottom-Left Quadrant -> LEFT */}
                    <button
                        className={`${btnBase} border-r border-gray-800`}
                        onClick={() => onMove('left')}
                        aria-label="Move Left"
                    >
                        <span className={iconClass}>◀</span>
                    </button>

                    {/* Bottom-Right Quadrant -> DOWN */}
                    <button
                        className={`${btnBase}`}
                        onClick={() => onMove('down')}
                        aria-label="Move Down"
                    >
                        <span className={iconClass}>▼</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
