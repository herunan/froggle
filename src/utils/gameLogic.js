import { GRID_SIZE, OBJECT_SIZES, LANE_TYPES } from './constants';

export const isColliding = (frog, obstacles, laneType) => {
    // Add padding for tighter hitboxes (0.15 on each side = 30% smaller hitbox)
    const HITBOX_PADDING = 0.15;

    // Frog hitbox with padding
    const frogLeft = frog.x + HITBOX_PADDING;
    const frogRight = frog.x + 1 - HITBOX_PADDING;

    for (const obs of obstacles) {
        const obsWidth = OBJECT_SIZES[obs.type] || 1;

        // Obstacle hitbox with padding
        const obsLeft = obs.x + HITBOX_PADDING;
        const obsRight = obs.x + obsWidth - HITBOX_PADDING;

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
    const HITBOX_PADDING = 0.15;
    const frogLeft = frog.x + HITBOX_PADDING;
    const frogRight = frog.x + 1 - HITBOX_PADDING;

    for (const obs of obstacles) {
        const obsWidth = OBJECT_SIZES[obs.type] || 1;
        const obsLeft = obs.x + HITBOX_PADDING;
        const obsRight = obs.x + obsWidth - HITBOX_PADDING;

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

    const obsWidth = OBJECT_SIZES[platform.type] || 1;
    // Center of platform
    const platformCenter = platform.x + (obsWidth / 2);

    // Center frog on platform (frog is 1 unit wide, so center is at 0.5)
    return platformCenter - 0.5;
};
