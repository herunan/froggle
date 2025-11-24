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
    // Use same coordinate system as obstacles: x * 6.66% (15 columns)
    const visualX = position.x * 6.66;
    const visualY = position.y * 6.66;

    return (
        <div
            className="absolute z-20"
            style={{
                left: `${visualX}%`,
                top: `${visualY}%`,
                width: '6.66%', // 100/15
                height: '6.66%'
            }}
        >
            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-sm ${direction === 'down' ? 'rotate-180' : direction === 'left' ? '-rotate-90' : direction === 'right' ? 'rotate-90' : ''}`}>
                {/* Back Legs (Splayed) */}
                <path d="M10 70 Q 5 50 25 50 L 30 60" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M90 70 Q 95 50 75 50 L 70 60" stroke="#15803d" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* Front Legs */}
                <path d="M30 30 L 15 20" stroke="#15803d" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M70 30 L 85 20" stroke="#15803d" strokeWidth="6" fill="none" strokeLinecap="round" />

                {/* Body (Main shape) */}
                <ellipse cx="50" cy="55" rx="25" ry="30" fill="#4ade80" />

                {/* Head Area (Slightly smaller, on top) */}
                <ellipse cx="50" cy="35" rx="20" ry="15" fill="#4ade80" />

                {/* Eyes (Bulging) */}
                <circle cx="35" cy="25" r="6" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
                <circle cx="65" cy="25" r="6" fill="#4ade80" stroke="#15803d" strokeWidth="1" />

                {/* Pupils */}
                <circle cx="35" cy="25" r="2" fill="black" />
                <circle cx="65" cy="25" r="2" fill="black" />

                {/* Back Pattern (Stripes/Spots) */}
                <path d="M40 60 L 60 60" stroke="#15803d" strokeWidth="3" opacity="0.5" />
                <path d="M45 70 L 55 70" stroke="#15803d" strokeWidth="3" opacity="0.5" />
            </svg>
        </div>
    );
};

export default Frog;
