export const GRID_SIZE = {
  rows: 15, // 1 start + 13 lanes + 1 goal
  cols: 15,
  cellSize: 40, // Base size in pixels, will scale
};

export const OBJECT_TYPES = {
  FROG: 'frog',
  CAR: 'car',
  TRUCK: 'truck',
  TURTLE: 'turtle',
  LOG: 'log',
  LILYPAD: 'lilypad',
};

export const LANE_TYPES = {
  SAFE: 'safe',
  ROAD: 'road',
  RIVER: 'river',
  GOAL: 'goal',
};

export const DIRECTIONS = {
  LEFT: -1,
  RIGHT: 1,
  UP: 'up',
  DOWN: 'down',
};

export const SPEEDS = {
  SLOW: 2,
  MEDIUM: 4,
  FAST: 6,
};

export const OBJECT_SIZES = {
  [OBJECT_TYPES.FROG]: 1,
  [OBJECT_TYPES.CAR]: 1,
  [OBJECT_TYPES.TRUCK]: 2,
  [OBJECT_TYPES.TURTLE]: 1,
  [OBJECT_TYPES.LOG]: 2,
  [OBJECT_TYPES.LILYPAD]: 1,
};
