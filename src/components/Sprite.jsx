import React from 'react';
import { OBJECT_TYPES } from '../utils/constants';

const Sprite = ({ type, width, direction, sinking }) => {
    // GBC Color Palette Helpers
    const colors = {
        black: '#000000',
        darkGreen: '#0f380f', // GBC Darkest
        green: '#306230',     // GBC Dark
        lightGreen: '#8bac0f',// GBC Light
        white: '#9bbc0f',     // GBC Lightest (classic)

        // Custom GBC-ish colors
        red: '#d32f2f',
        darkRed: '#8b0000',
        yellow: '#fbc02d',
        darkYellow: '#f57f17',
        brown: '#5d4037',
        darkBrown: '#3e2723',
        blue: '#1976d2',
        darkBlue: '#0d47a1',
        water: '#4fa4b8', // Oracle of Ages water-ish
    };

    // Common styles
    const pixelStyle = { shapeRendering: 'crispEdges' };

    // Rotation based on direction (1 = right, -1 = left)
    // Default sprites face RIGHT. If direction is -1, flip horizontally.
    const transform = direction === -1 ? 'scale(-1, 1)' : 'scale(1, 1)';

    const renderSprite = () => {
        switch (type) {
            case OBJECT_TYPES.CAR:
                return (
                    <svg viewBox="0 0 16 16" style={{ ...pixelStyle, transform }} className="w-full h-full">
                        {/* Shadow */}
                        <rect x="2" y="13" width="12" height="2" fill="rgba(0,0,0,0.3)" />
                        {/* Body */}
                        <rect x="1" y="4" width="14" height="8" fill={colors.red} />
                        <rect x="1" y="4" width="14" height="1" fill={colors.darkRed} /> {/* Highlight */}
                        <rect x="1" y="11" width="14" height="1" fill={colors.darkRed} /> {/* Shadow */}
                        {/* Windows */}
                        <rect x="4" y="5" width="4" height="6" fill={colors.black} />
                        <rect x="10" y="5" width="2" height="6" fill={colors.black} />
                        {/* Wheels */}
                        <rect x="2" y="11" width="3" height="3" fill="black" />
                        <rect x="11" y="11" width="3" height="3" fill="black" />
                        {/* Headlights */}
                        <rect x="14" y="5" width="1" height="2" fill={colors.yellow} />
                        <rect x="14" y="9" width="1" height="2" fill={colors.yellow} />
                    </svg>
                );

            case OBJECT_TYPES.TRUCK:
                return (
                    <svg viewBox="0 0 32 16" style={{ ...pixelStyle, transform }} className="w-full h-full">
                        {/* Shadow */}
                        <rect x="2" y="13" width="28" height="2" fill="rgba(0,0,0,0.3)" />
                        {/* Trailer */}
                        <rect x="1" y="2" width="22" height="11" fill={colors.yellow} />
                        <rect x="1" y="2" width="22" height="1" fill="#fff" opacity="0.5" />
                        <rect x="1" y="12" width="22" height="1" fill={colors.darkYellow} />
                        {/* Cab */}
                        <rect x="24" y="4" width="7" height="9" fill={colors.yellow} />
                        {/* Connection */}
                        <rect x="23" y="8" width="1" height="2" fill={colors.black} />
                        {/* Windows */}
                        <rect x="26" y="5" width="3" height="7" fill={colors.black} />
                        {/* Wheels */}
                        <rect x="3" y="12" width="4" height="3" fill="black" />
                        <rect x="17" y="12" width="4" height="3" fill="black" />
                        <rect x="25" y="12" width="4" height="3" fill="black" />
                        {/* Detail lines on trailer */}
                        <rect x="5" y="3" width="1" height="9" fill={colors.darkYellow} />
                        <rect x="10" y="3" width="1" height="9" fill={colors.darkYellow} />
                        <rect x="15" y="3" width="1" height="9" fill={colors.darkYellow} />
                        <rect x="20" y="3" width="1" height="9" fill={colors.darkYellow} />
                    </svg>
                );

            case OBJECT_TYPES.LOG:
                // Log repeats pattern based on width
                return (
                    <svg viewBox={`0 0 ${16 * width} 16`} preserveAspectRatio="none" style={pixelStyle} className="w-full h-full">
                        {/* Main Log Body */}
                        <rect x="0" y="2" width={16 * width} height="12" rx="2" fill={colors.brown} />
                        <rect x="0" y="2" width={16 * width} height="2" fill="#795548" /> {/* Highlight */}
                        <rect x="0" y="12" width={16 * width} height="2" fill={colors.darkBrown} /> {/* Shadow */}

                        {/* Wood Grain details - repeated */}
                        {Array.from({ length: width * 2 }).map((_, i) => (
                            <g key={i}>
                                <rect x={4 + (i * 8)} y="4" width="2" height="1" fill={colors.darkBrown} />
                                <rect x={2 + (i * 8)} y="7" width="3" height="1" fill={colors.darkBrown} />
                                <rect x={5 + (i * 8)} y="10" width="1" height="1" fill={colors.darkBrown} />
                            </g>
                        ))}

                        {/* Ends */}
                        <rect x="0" y="2" width="1" height="12" fill={colors.darkBrown} />
                        <rect x={(16 * width) - 1} y="2" width="1" height="12" fill={colors.darkBrown} />
                    </svg>
                );

            case OBJECT_TYPES.TURTLE:
                // Sinking effect handled by opacity in parent, but we can add closed shell state if needed
                return (
                    <svg viewBox="0 0 16 16" style={{ ...pixelStyle, transform }} className="w-full h-full">
                        {/* Head */}
                        <rect x="12" y="6" width="3" height="4" fill={colors.lightGreen} />
                        <rect x="13" y="7" width="1" height="1" fill="black" /> {/* Eye */}

                        {/* Legs */}
                        <rect x="2" y="3" width="3" height="2" fill={colors.lightGreen} />
                        <rect x="10" y="3" width="3" height="2" fill={colors.lightGreen} />
                        <rect x="2" y="11" width="3" height="2" fill={colors.lightGreen} />
                        <rect x="10" y="11" width="3" height="2" fill={colors.lightGreen} />

                        {/* Shell */}
                        <rect x="2" y="4" width="10" height="8" rx="4" fill={colors.darkGreen} />
                        <rect x="3" y="5" width="8" height="6" fill={colors.green} /> {/* Shell detail */}
                        <rect x="4" y="6" width="6" height="4" fill={colors.darkGreen} /> {/* Inner detail */}
                    </svg>
                );

            case OBJECT_TYPES.LILYPAD:
                return (
                    <svg viewBox="0 0 16 16" style={pixelStyle} className="w-full h-full">
                        {/* Main pad */}
                        <circle cx="8" cy="8" r="7" fill={colors.green} />
                        <circle cx="8" cy="8" r="5" fill={colors.lightGreen} />

                        {/* Cutout */}
                        <path d="M 8 8 L 14 2 L 16 6 Z" fill={colors.water} /> {/* Hacky cutout using water color */}
                        {/* Actually better to just draw the shape */}
                        <path d="M 8 8 L 15 4 L 15 12 Z" fill="transparent" stroke={colors.darkGreen} strokeWidth="1" />
                    </svg>
                );

            default:
                return <div className="w-full h-full bg-gray-500"></div>;
        }
    };

    return renderSprite();
};

export default Sprite;
