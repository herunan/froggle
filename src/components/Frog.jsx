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

    // Use same coordinate system as obstacles: x * 6.66% (15 columns)
    const visualX = position.x * 6.66;
    const visualY = position.y * 6.66;

    // GBC Frog Sprite
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
            <svg viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }} className={`w-full h-full ${direction === 'down' ? 'rotate-180' : direction === 'left' ? '-rotate-90' : direction === 'right' ? 'rotate-90' : ''}`}>
                {/* Shadow */}
                <rect x="2" y="13" width="12" height="2" fill="rgba(0,0,0,0.3)" />

                {/* Back Legs */}
                <rect x="1" y="8" width="3" height="5" fill="#306230" />
                <rect x="12" y="8" width="3" height="5" fill="#306230" />

                {/* Body */}
                <rect x="4" y="3" width="8" height="10" fill="#8bac0f" />
                <rect x="4" y="3" width="8" height="1" fill="#9bbc0f" /> {/* Highlight */}

                {/* Head/Eyes */}
                <rect x="4" y="2" width="3" height="3" fill="#8bac0f" />
                <rect x="9" y="2" width="3" height="3" fill="#8bac0f" />
                <rect x="5" y="3" width="1" height="1" fill="black" />
                <rect x="10" y="3" width="1" height="1" fill="black" />

                {/* Front Legs */}
                <rect x="2" y="4" width="2" height="3" fill="#8bac0f" />
                <rect x="12" y="4" width="2" height="3" fill="#8bac0f" />

                {/* Back Spots */}
                <rect x="6" y="7" width="1" height="1" fill="#306230" />
                <rect x="9" y="9" width="1" height="1" fill="#306230" />
            </svg>
        </div>
    );
};

export default Frog;
