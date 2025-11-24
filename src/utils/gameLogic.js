import { GRID_SIZE, OBJECT_SIZES, LANE_TYPES } from './constants';

// BLOCK-BASED COLLISION SYSTEM
// Frog and obstacles occupy discrete blocks on a grid

export const isColliding = (frog, obstacles, laneType) => {
    // Frog occupies exactly one block (integer coordinates)
    const frogBlock = Math.round(frog.x);

    for (const obs of obstacles) {
        const obsWidth = obs.width || OBJECT_SIZES[obs.type] || 1;
        const obsStartBlock = Math.round(obs.x);
        const obsEndBlock = obsStartBlock + obsWidth - 1; // Inclusive

        // Check if frog block is within obstacle blocks
        const hit = frogBlock >= obsStartBlock && frogBlock <= obsEndBlock;

        if (hit) {
            if (laneType === LANE_TYPES.ROAD) {
                return true; // Hit by car
            } else if (laneType === LANE_TYPES.RIVER) {
                return false; // Safe on log/turtle
            }
        }
    }

    // If river and no collision with object, frog is in water (dead)
    if (laneType === LANE_TYPES.RIVER) {
        return true;
    }

    return false;
};

export const moveFrog = (currentPos, direction) => {
    const newPos = { ...currentPos };

    switch (direction) {
        case 'up':
            newPos.y = Math.max(0, newPos.y - 1);
            break;
        case 'down':
            newPos.y = Math.min(GRID_SIZE.rows - 1, newPos.y + 1);
            break;
        case 'left':
            newPos.x = Math.max(0, Math.round(currentPos.x) - 1);
            break;
        case 'right':
            newPos.x = Math.min(GRID_SIZE.cols - 1, Math.round(currentPos.x) + 1);
            break;
    }

    return newPos;
};

export const findPlatformUnder = (frog, obstacles) => {
    const frogBlock = Math.round(frog.x);

    for (const obs of obstacles) {
        const obsWidth = obs.width || OBJECT_SIZES[obs.type] || 1;
        const obsStartBlock = Math.round(obs.x);
        const obsEndBlock = obsStartBlock + obsWidth - 1; // Inclusive

        // Check if frog block is within platform blocks
        if (frogBlock >= obsStartBlock && frogBlock <= obsEndBlock) {
            return obs;
        }
    }

    return null;
};

export const snapFrogToPlatform = (frog, platform) => {
    if (!platform) return frog.x;

    // Snap to nearest block on platform
    const frogBlock = Math.round(frog.x);
    const obsWidth = platform.width || OBJECT_SIZES[platform.type] || 1;
    const obsStartBlock = Math.round(platform.x);
    const obsEndBlock = obsStartBlock + obsWidth - 1;

    // Clamp frog to platform bounds
    const snappedBlock = Math.max(obsStartBlock, Math.min(obsEndBlock, frogBlock));

    return snappedBlock;
};

export const getFrogBlockOnPlatform = (frog, platform) => {
    if (!platform) return null;

    // Return which block of the platform the frog is on (0-indexed relative to platform start)
    const frogBlock = Math.round(frog.x);
    const obsStartBlock = Math.round(platform.x);

    return frogBlock - obsStartBlock;
};
