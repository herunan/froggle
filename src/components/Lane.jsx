import React from 'react';
import { LANE_TYPES, OBJECT_TYPES } from '../utils/constants';
import Sprite from './Sprite';

const Lane = ({ type, obstacles, rowIndex, direction }) => {
    const getBgColor = () => {
        switch (type) {
            case LANE_TYPES.ROAD: return 'bg-[#2d2d2d]'; // Dark asphalt
            case LANE_TYPES.RIVER: return 'bg-[#4fa4b8]'; // GBC Water
            case LANE_TYPES.GOAL: return 'bg-[#306230]'; // GBC Green
            default: return 'bg-[#306230]'; // Safe zone (Grass)
        }
    };

    return (
        <div className={`relative w-full h-[6.66%] ${getBgColor()} overflow-hidden border-b border-black/10`}>
            {/* Lane Texture/Detail could go here */}
            {type === LANE_TYPES.SAFE && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0f380f 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            )}

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
                    <Sprite
                        type={obs.type}
                        width={obs.width || 1}
                        direction={direction}
                        sinking={obs.sinking}
                    />
                </div>
            ))}
        </div>
    );
};

export default Lane;
