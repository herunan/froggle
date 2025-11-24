import React, { useState, useEffect } from 'react';

const Controls = ({ onMove }) => {
    const [activeKey, setActiveKey] = useState(null);

    // Container rotated 45 degrees - no outer border, smaller size
    const containerClass = "relative w-32 h-32 bg-gray-900 overflow-hidden rotate-45";

    // Button base with conditional active state
    const getButtonClass = (direction) => {
        const baseClass = "w-full h-full flex items-center justify-center text-3xl touch-manipulation select-none outline-none bg-gray-900 transition-colors";
        const normalColor = "text-gray-400";
        const activeColor = "text-gray-300";
        const isActive = activeKey === direction;
        return `${baseClass} ${isActive ? activeColor : normalColor} `;
    };

    // Icon rotation to counteract container rotation (-45deg)
    const iconClass = "-rotate-45";

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyMap = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right'
            };

            const direction = keyMap[e.key];
            if (direction) {
                e.preventDefault();
                setActiveKey(direction);
                onMove(direction);
            }
        };

        const handleKeyUp = (e) => {
            const keyMap = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right'
            };

            if (keyMap[e.key]) {
                setActiveKey(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onMove]);

    const handleButtonClick = (direction) => {
        setActiveKey(direction);
        onMove(direction);
        setTimeout(() => setActiveKey(null), 150);
    };

    return (
        <div className="flex justify-center mb-1">
            <div className={containerClass}>
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    {/* Top-Left Quadrant -> UP */}
                    <button
                        className={`${getButtonClass('up')} border-r-4 border-b-4 border-gray-700`}
                        onClick={() => handleButtonClick('up')}
                        aria-label="Move Up"
                    >
                        <span className={iconClass}>▲</span>
                    </button>

                    {/* Top-Right Quadrant -> RIGHT */}
                    <button
                        className={`${getButtonClass('right')} border-b-4 border-gray-700`}
                        onClick={() => handleButtonClick('right')}
                        aria-label="Move Right"
                    >
                        <span className={iconClass}>▶</span>
                    </button>

                    {/* Bottom-Left Quadrant -> LEFT */}
                    <button
                        className={`${getButtonClass('left')} border-r-4 border-gray-700`}
                        onClick={() => handleButtonClick('left')}
                        aria-label="Move Left"
                    >
                        <span className={iconClass}>◀</span>
                    </button>

                    {/* Bottom-Right Quadrant -> DOWN */}
                    <button
                        className={getButtonClass('down')}
                        onClick={() => handleButtonClick('down')}
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
