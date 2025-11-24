import { GRID_SIZE, OBJECT_SIZES, LANE_TYPES } from './constants';

export const isColliding = (frog, obstacles, laneType) => {
    // Dynamic padding based on lane type
    // River: 0.0 (or slightly negative) to make landing SAFE even on edges
    // Road: 0.2 to make dodging EASIER (smaller car hitboxes)
    let padding = 0.05; // Default

    if (laneType === LANE_TYPES.RIVER) {
        padding = 0.0; // Touching the edge is SAFE
    } else if (laneType === LANE_TYPES.ROAD) {
        padding = 0.2; // Hitbox is 40% smaller (0.2 from each side), easier to dodge
    }

    // Frog hitbox - keep it standard or slightly forgiving?
    // Let's keep frog standard (1x1) but apply padding to the interaction logic above effectively
    // Actually, applying padding to the *check* is cleaner.

    const frogLeft = frog.x + padding;
    const frogRight = frog.x + 1 - padding;

    for (const obs of obstacles) {
        // USE OBS.WIDTH IF AVAILABLE! (Fix for variable log lengths)
        const obsWidth = obs.width || OBJECT_SIZES[obs.type] || 1;

        // Obstacle hitbox
        const obsLeft = obs.x + padding;
        const obsRight = obs.x + obsWidth - padding;

        // Check horizontal overlap
        const overlap = frogLeft < obsRight && frogRight > obsLeft;

        if (overlap) {
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
            newPos.x = Math.max(0, newPos.x - 1);
            break;
        case 'right':
            newPos.x = Math.min(GRID_SIZE.cols - 1, newPos.x + 1);
            break;
    }

    return newPos;
};

export const findPlatformUnder = (frog, obstacles) => {
    // Match the RIVER padding from isColliding (0.0)
    const padding = 0.0;

    const frogLeft = frog.x + padding;
    const frogRight = frog.x + 1 - padding;

    for (const obs of obstacles) {
        // USE OBS.WIDTH IF AVAILABLE!
        const obsWidth = obs.width || OBJECT_SIZES[obs.type] || 1;
        const obsLeft = obs.x + padding;
        const obsRight = obs.x + obsWidth - padding;

        // Check if frog is on this platform
        const overlap = frogLeft < obsRight && frogRight > obsLeft;

        if (overlap) {
            return obs;
        }
    }

    return null;
};

export const centerFrogOnPlatform = (frog, platform) => {
    if (!platform) return frog.x;

    const obsWidth = platform.width || OBJECT_SIZES[platform.type] || 1;

    // Snap to nearest block within the platform
    // Round the frog's x position to the nearest integer, then center it on that block
    const nearestBlock = Math.round(frog.x);

    // Clamp to platform bounds
    const platformLeft = platform.x;
    const platformRight = platform.x + obsWidth - 1;

    const targetBlock = Math.max(platformLeft, Math.min(platformRight, nearestBlock));

    // Center on the block (add 0.5 to be in the middle of the grid cell)
    return targetBlock;
};
