import React from 'react';
import { LANE_TYPES, OBJECT_TYPES } from '../utils/constants';

const Lane = ({ type, obstacles, rowIndex }) => {
    const getBgColor = () => {
        switch (type) {
            case LANE_TYPES.ROAD: return 'bg-gray-800';
            case LANE_TYPES.RIVER: return 'bg-blue-500';
            case LANE_TYPES.GOAL: return 'bg-green-800';
            default: return 'bg-gray-900'; // Safe zone
        }
    };

    return (
        <div className={`relative w-full h-[6.66%] ${getBgColor()} overflow-hidden border-b border-black/10`}>
            {/* Render obstacles */}
            {obstacles.map((obs, i) => (
                <div
                    key={i}
                    className="absolute top-0 h-full"
                    style={{
                        left: `${obs.x * 6.66}%`,
                        width: `${(obs.width || 1) * 6.66}%`,
                        opacity: obs.sinking ? 0.3 : 1,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    {/* Placeholder for sprites */}
                    <div className={`w-full h-full p-1`}>
                        <div className={`w-full h-full ${obs.type === OBJECT_TYPES.LOG ? 'bg-amber-800' :
                            obs.type === OBJECT_TYPES.TURTLE ? 'bg-green-800' :
                                obs.type === OBJECT_TYPES.LILYPAD ? 'bg-green-500' :
                                    obs.type === OBJECT_TYPES.CAR ? 'bg-red-500' :
                                        obs.type === OBJECT_TYPES.TRUCK ? 'bg-yellow-500' :
                                            'bg-white'
                            }`}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Lane;
