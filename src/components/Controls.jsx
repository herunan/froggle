import React, { useState, useEffect } from 'react';

const Controls = ({ onMove }) => {
    const [activeKey, setActiveKey] = useState(null);

    // Container rotated 45 degrees - removed circular border and rounded-full
    const containerClass = "relative w-48 h-48 bg-gray-900 overflow-hidden rotate-45";

    // Button base: fills the quadrant, flex center - minimal styling
    const btnBase = "w-full h-full flex items-center justify-center text-3xl text-gray-400 touch-manipulation select-none outline-none bg-gray-900 transition-colors";

    // Icon rotation to counteract container rotation (-45deg)
    const iconClass = "-rotate-45";

    // Add keyboard event listeners
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.repeat) return; // Ignore repeated keydown events

            let direction = null;
            switch (e.key) {
                case 'ArrowUp':
                    direction = 'up';
                    break;
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'ArrowRight':
                    direction = 'right';
                    break;
                default:
                    return;
            }

            e.preventDefault();
            setActiveKey(direction);
            onMove(direction); // Trigger move on keydown
        };

        const handleKeyUp = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    setActiveKey(null);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onMove]);

    const getButtonClass = (direction) => {
        const isActive = activeKey === direction;
        return `${btnBase} ${isActive ? 'text-gray-300' : ''} `;
    };

    return (
        <div className="flex justify-center mb-2">
            <div className={containerClass}>
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    {/* Top-Left Quadrant -> UP */}
                    <button
                        className={`${getButtonClass('up')} border - r - 4 border - b - 4 border - gray - 700`}
                        onClick={() => onMove('up')}
                        aria-label="Move Up"
                    >
                        <span className={iconClass}>▲</span>
                    </button>

                    {/* Top-Right Quadrant -> RIGHT */}
                    <button
                        className={`${getButtonClass('right')} border - b - 4 border - gray - 700`}
                        onClick={() => onMove('right')}
                        aria-label="Move Right"
                    >
                        <span className={iconClass}>▶</span>
                    </button>

                    {/* Bottom-Left Quadrant -> LEFT */}
                    <button
                        className={`${getButtonClass('left')} border - r - 4 border - gray - 700`}
                        onClick={() => onMove('left')}
                        aria-label="Move Left"
                    >
                        <span className={iconClass}>◀</span>
                    </button>

                    {/* Bottom-Right Quadrant -> DOWN */}
                    <button
                        className={`${getButtonClass('down')} `}
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
