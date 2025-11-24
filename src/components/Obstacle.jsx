import React from 'react';
import { OBJECT_TYPES } from '../utils/constants';

const Obstacle = ({ type, width }) => {
    // Common SVG props
    const svgProps = {
        viewBox: "0 0 100 100",
        className: "w-full h-full drop-shadow-sm",
        preserveAspectRatio: "none" // Allow stretching for logs/trucks
    };

    switch (type) {
        case OBJECT_TYPES.CAR:
            return (
                <svg {...svgProps} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Wheels */}
                    <rect x="10" y="15" width="10" height="20" fill="#333" rx="2" />
                    <rect x="80" y="15" width="10" height="20" fill="#333" rx="2" />
                    <rect x="10" y="65" width="10" height="20" fill="#333" rx="2" />
                    <rect x="80" y="65" width="10" height="20" fill="#333" rx="2" />
                    {/* Body */}
                    <rect x="15" y="10" width="70" height="80" fill="#ef4444" rx="10" />
                    {/* Roof/Cabin */}
                    <rect x="20" y="35" width="60" height="35" fill="#b91c1c" rx="5" />
                    {/* Windshield */}
                    <rect x="25" y="40" width="50" height="10" fill="#7f1d1d" />
                    {/* Rear Window */}
                    <rect x="25" y="60" width="50" height="5" fill="#7f1d1d" />
                </svg>
            );

        case OBJECT_TYPES.TRUCK:
            return (
                <svg {...svgProps} viewBox="0 0 200 100" preserveAspectRatio="none">
                    {/* Wheels */}
                    <rect x="20" y="10" width="20" height="15" fill="#333" />
                    <rect x="20" y="75" width="20" height="15" fill="#333" />
                    <rect x="140" y="10" width="20" height="15" fill="#333" />
                    <rect x="140" y="75" width="20" height="15" fill="#333" />
                    {/* Cab */}
                    <rect x="10" y="15" width="50" height="70" fill="#eab308" rx="5" />
                    <rect x="35" y="20" width="20" height="60" fill="#ca8a04" rx="2" /> {/* Windshield area */}
                    {/* Trailer */}
                    <rect x="70" y="15" width="120" height="70" fill="#facc15" rx="2" stroke="#ca8a04" strokeWidth="2" />
                    <line x1="130" y1="15" x2="130" y2="85" stroke="#ca8a04" strokeWidth="2" />
                </svg>
            );

        case OBJECT_TYPES.LOG:
            return (
                <svg {...svgProps} preserveAspectRatio="none">
                    {/* Main Log Body */}
                    <rect x="2" y="15" width="96" height="70" fill="#78350f" rx="10" />
                    {/* Bark Texture Details */}
                    <path d="M10 25 Q 30 20 50 25 T 90 25" fill="none" stroke="#92400e" strokeWidth="3" opacity="0.5" />
                    <path d="M15 45 Q 35 40 55 45 T 85 45" fill="none" stroke="#92400e" strokeWidth="3" opacity="0.5" />
                    <path d="M10 65 Q 30 60 50 65 T 90 65" fill="none" stroke="#92400e" strokeWidth="3" opacity="0.5" />
                    {/* Ends */}
                    <circle cx="5" cy="50" r="10" fill="#92400e" />
                    <circle cx="95" cy="50" r="10" fill="#92400e" />
                </svg>
            );

        case OBJECT_TYPES.TURTLE:
            return (
                <svg {...svgProps} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Legs */}
                    <circle cx="20" cy="20" r="12" fill="#166534" />
                    <circle cx="80" cy="20" r="12" fill="#166534" />
                    <circle cx="20" cy="80" r="12" fill="#166534" />
                    <circle cx="80" cy="80" r="12" fill="#166534" />
                    {/* Head */}
                    <circle cx="50" cy="15" r="15" fill="#166534" />
                    {/* Shell */}
                    <ellipse cx="50" cy="50" rx="35" ry="40" fill="#14532d" stroke="#166534" strokeWidth="2" />
                    {/* Shell Pattern */}
                    <path d="M50 20 L75 40 L65 70 L35 70 L25 40 Z" fill="#15803d" opacity="0.8" />
                </svg>
            );

        case OBJECT_TYPES.LILYPAD:
            return (
                <svg {...svgProps} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Main Leaf with Cutout */}
                    <path d="M50 50 L85 85 A 45 45 0 1 0 85 15 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                    {/* Veins */}
                    <path d="M50 50 L20 20" stroke="#15803d" strokeWidth="2" opacity="0.5" />
                    <path d="M50 50 L20 80" stroke="#15803d" strokeWidth="2" opacity="0.5" />
                    <path d="M50 50 L10 50" stroke="#15803d" strokeWidth="2" opacity="0.5" />
                </svg>
            );

        default:
            return <div className="w-full h-full bg-gray-500 rounded"></div>;
    }
};

export default Obstacle;
