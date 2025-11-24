import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, LANE_TYPES, OBJECT_SIZES, OBJECT_TYPES, SPEEDS, DIRECTIONS } from '../utils/constants';
import { getRNG } from '../utils/dailySeed';
import { isColliding, moveFrog, findPlatformUnder, centerFrogOnPlatform } from '../utils/gameLogic';
import Lane from './Lane';
import Frog from './Frog';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import WastedOverlay from './WastedOverlay';

const GAME_STATE_KEY = 'froggle-daily-state';

const Game = () => {
    const [gameState, setGameState] = useState('playing'); // playing, won
    const [livesUsed, setLivesUsed] = useState(0);
    const [showWasted, setShowWasted] = useState(false);
    const [time, setTime] = useState(0);
    const [frogPos, setFrogPos] = useState({ x: Math.floor(GRID_SIZE.cols / 2), y: GRID_SIZE.rows - 1 });
    const [lanes, setLanes] = useState([]);

    const requestRef = useRef();
    const previousTimeRef = useRef();
    const lanesRef = useRef([]); // Mutable ref for animation loop to avoid stale closures

    // Load State
    useEffect(() => {
        const savedState = localStorage.getItem(GAME_STATE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                // Only restore if it's the same day (you might want to add a date check here in a real app)
                // For now, we assume the daily seed handles the "same day" logic for the board,
                // but we should probably check if the saved state belongs to today.
                // Since the requirement is just "Safe state", we'll restore it.
                // Ideally we'd store the date in the state and compare.
                const today = new Date().toDateString();
                if (parsed.date === today) {
                    setLivesUsed(parsed.livesUsed || 0);
                    setTime(parsed.time || 0);
                    if (parsed.gameState === 'won') {
                        setGameState('won');
                    }
                }
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }, []);

    // Save State
    useEffect(() => {
        const stateToSave = {
            livesUsed,
            time,
            gameState,
            date: new Date().toDateString()
        };
        localStorage.setItem(GAME_STATE_KEY, JSON.stringify(stateToSave));
    }, [livesUsed, time, gameState]);

    // Initialize Game
    useEffect(() => {
        const rng = getRNG();
        const newLanes = [];
        let prevSpeed = null;
        let prevDirection = null;

        // Generate Lanes
        for (let i = 0; i < GRID_SIZE.rows; i++) {
            let type = LANE_TYPES.SAFE;
            let obstacles = [];
            let speed = 0;
            let direction = 1;

            if (i === 0) {
                type = LANE_TYPES.GOAL;
            } else if (i > 0 && i < 6) {
                type = LANE_TYPES.RIVER;

                // Prevent adjacent lanes with same speed AND direction (80% of the time)
                const availableSpeeds = [SPEEDS.SLOW, SPEEDS.MEDIUM];
                const availableDirections = [-1, 1];

                // 80% chance to avoid same speed+direction as previous lane
                if (prevSpeed !== null && rng.nextFloat() > 0.2) {
                    // Try to vary either speed or direction
                    if (rng.nextFloat() > 0.5) {
                        // Vary direction
                        direction = prevDirection === 1 ? -1 : 1;
                        speed = rng.choice(availableSpeeds);
                    } else {
                        // Vary speed
                        const filteredSpeeds = availableSpeeds.filter(s => s !== prevSpeed);
                        speed = filteredSpeeds.length > 0 ? rng.choice(filteredSpeeds) : rng.choice(availableSpeeds);
                        direction = rng.choice(availableDirections);
                    }
                } else {
                    // 20% chance to be random (can be same)
                    speed = rng.choice(availableSpeeds);
                    direction = rng.choice(availableDirections);
                }

                // Generate logs/turtles with variable lengths
                const obsType = rng.choice([OBJECT_TYPES.LOG, OBJECT_TYPES.TURTLE, OBJECT_TYPES.LILYPAD]);
                const count = rng.nextRange(2, 4);

                for (let j = 0; j < count; j++) {
                    let width = OBJECT_SIZES[obsType];

                    // Variable log lengths (1, 2, or 3 blocks, but mostly 2)
                    if (obsType === OBJECT_TYPES.LOG) {
                        const lengthChoice = rng.nextFloat();
                        if (lengthChoice < 0.2) {
                            width = 1; // 20% chance
                        } else if (lengthChoice < 0.85) {
                            width = 2; // 65% chance
                        } else {
                            width = 3; // 15% chance
                        }
                    }

                    obstacles.push({
                        x: (j * (GRID_SIZE.cols / count)) + rng.nextRange(0, 2),
                        type: obsType,
                        width: width,
                        // For turtles, add sinking state (starts visible)
                        sinking: obsType === OBJECT_TYPES.TURTLE ? false : undefined,
                        sinkCycle: obsType === OBJECT_TYPES.TURTLE ? rng.nextRange(0, 100) : undefined
                    });
                }

                prevSpeed = speed;
                prevDirection = direction;

            } else if (i > 6 && i < 14) { // Extended road to row 13
                type = LANE_TYPES.ROAD;

                // Same logic for roads - prevent adjacent same speed+direction
                const availableSpeeds = [SPEEDS.SLOW, SPEEDS.MEDIUM, SPEEDS.FAST];
                const availableDirections = [-1, 1];

                if (prevSpeed !== null && rng.nextFloat() > 0.2) {
                    if (rng.nextFloat() > 0.5) {
                        direction = prevDirection === 1 ? -1 : 1;
                        speed = rng.choice(availableSpeeds);
                    } else {
                        const filteredSpeeds = availableSpeeds.filter(s => s !== prevSpeed);
                        speed = filteredSpeeds.length > 0 ? rng.choice(filteredSpeeds) : rng.choice(availableSpeeds);
                        direction = rng.choice(availableDirections);
                    }
                } else {
                    speed = rng.choice(availableSpeeds);
                    direction = rng.choice(availableDirections);
                }

                // Generate cars
                const obsType = rng.choice([OBJECT_TYPES.CAR, OBJECT_TYPES.TRUCK]);
                const count = rng.nextRange(2, 4);
                for (let j = 0; j < count; j++) {
                    obstacles.push({
                        x: (j * (GRID_SIZE.cols / count)) + rng.nextRange(0, 2),
                        type: obsType,
                        width: OBJECT_SIZES[obsType]
                    });
                }

                prevSpeed = speed;
                prevDirection = direction;
            } else {
                // Reset for safe zones
                prevSpeed = null;
                prevDirection = null;
            }

            newLanes.push({ type, obstacles, speed, direction, id: i });
        }

        setLanes(newLanes);
        lanesRef.current = newLanes;
    }, []);

    const handleMove = useCallback((direction) => {
        if (gameState !== 'playing' || showWasted) return;

        setFrogPos(prev => {
            const newPos = moveFrog(prev, direction);

            // Snap to grid if moving vertically to "lock in"
            if (direction === 'up' || direction === 'down') {
                newPos.x = Math.round(newPos.x);

                // If landing on a river lane, center on the platform
                const targetLane = lanesRef.current[newPos.y];
                if (targetLane && targetLane.type === LANE_TYPES.RIVER) {
                    const platform = findPlatformUnder(newPos, targetLane.obstacles);
                    if (platform) {
                        newPos.x = centerFrogOnPlatform(newPos, platform);
                    }
                }
            }

            frogPosRef.current = newPos; // Sync ref immediately
            return newPos;
        });
    }, [gameState, showWasted]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp': handleMove('up'); break;
                case 'ArrowDown': handleMove('down'); break;
                case 'ArrowLeft': handleMove('left'); break;
                case 'ArrowRight': handleMove('right'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleMove]);

    // Sync ref with state - still needed for initial load or resets
    useEffect(() => {
        frogPosRef.current = frogPos;
    }, [frogPos]);

    const frogPosRef = useRef(frogPos);

    // Game Loop
    const animate = (time) => {
        if (gameState !== 'playing' || showWasted) return;

        if (previousTimeRef.current !== undefined) {
            let deltaTime = (time - previousTimeRef.current) / 1000;

            // Cap deltaTime to prevent huge jumps (e.g. tab switching)
            if (deltaTime > 0.1) deltaTime = 0.1;

            // Update time
            setTime(prev => prev + deltaTime);

            // Update obstacles
            const currentLanes = lanesRef.current.map(lane => {
                if (lane.speed === 0) return lane;

                const moveAmount = lane.speed * deltaTime * lane.direction;
                const newObstacles = lane.obstacles.map(obs => {
                    let newX = obs.x + moveAmount;
                    // Wrap around
                    if (lane.direction === 1 && newX > GRID_SIZE.cols) newX = -obs.width;
                    if (lane.direction === -1 && newX < -obs.width) newX = GRID_SIZE.cols;

                    // Update turtle sinking state
                    let newObs = { ...obs, x: newX };
                    if (obs.type === OBJECT_TYPES.TURTLE) {
                        // Turtle sinks in a cycle: visible for 3s, sinking for 2s
                        const cycle = ((time / 1000) + (obs.sinkCycle || 0)) % 5;
                        newObs.sinking = cycle > 3; // Sink during the last 2 seconds of the 5s cycle
                    }

                    return newObs;
                });
                return { ...lane, obstacles: newObstacles };
            });

            lanesRef.current = currentLanes;
            setLanes(currentLanes);

            // Handle River Drift
            const currentFrogY = frogPosRef.current.y;
            const currentLane = currentLanes[currentFrogY];

            if (currentLane && currentLane.type === LANE_TYPES.RIVER) {
                // Check if on log (safe)
                const dead = isColliding(frogPosRef.current, currentLane.obstacles, currentLane.type);

                if (!dead) {
                    const drift = currentLane.speed * deltaTime * currentLane.direction;
                    const newX = frogPosRef.current.x + drift;

                    // Update Ref IMMEDIATELY to prevent lag in next frame calculation
                    frogPosRef.current = { ...frogPosRef.current, x: newX };

                    // Update State to trigger render
                    setFrogPos(prev => ({ ...prev, x: newX }));
                }
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameState]); // Re-bind when game state changes

    // Collision Check Effect
    useEffect(() => {
        if (gameState !== 'playing') return;

        const currentLane = lanesRef.current[frogPos.y];
        if (!currentLane) return;

        // Check Goal
        if (currentLane.type === LANE_TYPES.GOAL) {
            setGameState('won');
            return;
        }

        const hit = isColliding(frogPos, currentLane.obstacles, currentLane.type);

        if (hit) {
            // Die - Unlimited Lives
            if (!showWasted) {
                setLivesUsed(l => l + 1);
                setShowWasted(true);
                // Frog position reset is handled after Wasted screen or immediately?
                // Requirement: "It does one flash, with wasted in red and B&W background."
                // Usually in GTA you respawn after the wasted screen.
                // We'll let the WastedOverlay handle the delay.
            }
        } else {
            // Even if on platform, check if it's a sinking turtle
            if (currentLane.type === LANE_TYPES.RIVER) {
                const platform = findPlatformUnder(frogPos, currentLane.obstacles);
                if (platform && platform.type === OBJECT_TYPES.TURTLE && platform.sinking) {
                    // Turtle is sinking - frog dies
                    if (!showWasted) {
                        setLivesUsed(l => l + 1);
                        setShowWasted(true);
                    }
                }
            }
        }

    }, [frogPos, lanes, livesUsed, gameState]);

    // Animation loop drift logic
    useEffect(() => {
        if (gameState !== 'playing') return;

        // We can't easily hook into the existing animate loop from here without refactoring.
        // But wait, the animate loop DOES have access to everything via refs.
        // Let's modify the animate function in the next step if needed.
        // For now, let's just fix the syntax error and leave the drift placeholder or implement a simple version.

        // Actually, I can't easily implement smooth drift here without causing infinite loops if I set state.
        // I will leave the drift logic for the animation loop refactor.
    }, [gameState]);

    const handleWastedComplete = () => {
        setShowWasted(false);
        setFrogPos({ x: Math.floor(GRID_SIZE.cols / 2), y: GRID_SIZE.rows - 1 });
    };

    const handleShare = () => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Calculate Day # (Assuming Day 1 is Nov 24, 2025)
        const startDate = new Date('2025-11-24T00:00:00Z');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const dayNumber = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        const text = `🐸 Froggle #${dayNumber}\n❤️ ${livesUsed}\n⏱️ ${timeStr}\nPlay at https://froggle-daily.surge.sh`;
        navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
    };

    return (
        <div className="flex flex-col items-center justify-between h-[100dvh] bg-gray-900 overflow-hidden">
            <div className="flex flex-col items-center w-full pt-2 px-2 flex-shrink-0">
                <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-0 font-pixel">FROGGLE</h1>
                <ScoreBoard livesUsed={livesUsed} time={time} />
            </div>

            <div className="flex-1 w-full flex items-center justify-center min-h-0 px-2 py-1">
                <div
                    className="relative bg-black overflow-hidden shadow-2xl border-4 border-gray-700 touch-none"
                    style={{
                        width: 'min(90vw, 55dvh, 500px)',
                        height: 'min(90vw, 55dvh, 500px)', // Square aspect ratio
                    }}
                >
                    {lanes.map(lane => (
                        <Lane key={lane.id} {...lane} rowIndex={lane.id} />
                    ))}
                    <Frog position={frogPos} direction={'up'} />

                    {showWasted && <WastedOverlay onComplete={handleWastedComplete} />}

                    {gameState === 'won' && (
                        <GameOver won={true} time={time} livesUsed={livesUsed} onShare={handleShare} />
                    )}
                </div>
            </div>

            <div className="flex-shrink-0 w-full pb-safe mb-1">
                <Controls onMove={handleMove} />
            </div>
        </div>
    );
};

export default Game;
