import React from 'react';
import { OBJECT_SIZES, OBJECT_TYPES } from '../utils/constants';

const Frog = ({ position, direction }) => {
    const style = {
        left: `${position.x * 100}%`, // Will need to adjust based on parent container
        top: '0', // Positioned by parent lane? No, frog moves across lanes.
        // Actually, it's easier if the frog is absolutely positioned on the grid.
        transform: `translate(${position.x * 100}%, ${position.y * 100}%)`,
        width: `${100 / 15}%`, // 1/15th of the width
        height: `${100 / 15}%`, // 1/15th of the height
    };

    // Simple SVG Frog
    return (
        <div
            className="absolute z-20"
            style={{
                left: 0,
                top: 0,
                width: '6.66%', // 100/15
                height: '6.66%',
                transform: `translate(${position.x * 100}%, ${position.y * 100}%)`
            }}
        >
            <svg viewBox="0 0 10 10" className={`w-full h-full ${direction === 'down' ? 'rotate-180' : direction === 'left' ? '-rotate-90' : direction === 'right' ? 'rotate-90' : ''}`}>
                <rect x="2" y="2" width="6" height="6" fill="#4ade80" />
                <rect x="3" y="3" width="1" height="1" fill="black" />
                <rect x="6" y="3" width="1" height="1" fill="black" />
            </svg>
        </div>
    );
};

export default Frog;
