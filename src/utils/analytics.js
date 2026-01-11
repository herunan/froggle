/**
 * PostHog Cookie-less Analytics
 * Provides privacy-preserving analytics without storing any cookies or local data
 */

import posthog from 'posthog-js';

// Calculate day number (Day 1 = Nov 24, 2025)
const getDayNumber = () => {
    const startDate = new Date('2025-11-24T00:00:00Z');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
};

// Check if running on mobile
const isMobile = () => window.innerWidth < 768;

/**
 * Track a game event in PostHog
 * Uses cookie-less mode for privacy
 */
export const trackEvent = (eventName, properties = {}) => {
    // PostHog may not be initialized if VITE_POSTHOG_KEY is not set
    if (!posthog.__loaded) {
        console.debug('PostHog not initialized, skipping event:', eventName);
        return;
    }

    const enrichedProperties = {
        ...properties,
        day_number: getDayNumber(),
        is_mobile: isMobile(),
        timestamp: new Date().toISOString(),
    };

    posthog.capture(eventName, enrichedProperties);
};

/**
 * Track game start
 */
export const trackGameStarted = () => {
    trackEvent('game_started');
};

/**
 * Track player death with position for heatmap
 * @param {number} x - Grid X position (0-14)
 * @param {number} y - Grid Y position (0-14)
 * @param {string} laneType - 'road' | 'river'
 * @param {string} cause - 'car' | 'truck' | 'water' | 'sinking_turtle'
 */
export const trackDeath = (x, y, laneType, cause) => {
    trackEvent('death', {
        x: Math.round(x),
        y: y,
        lane_type: laneType,
        cause: cause,
        // Normalized position for easier heatmap visualization (0-1 range)
        x_normalized: x / 15,
        y_normalized: y / 15,
    });
};

/**
 * Track game completion
 * @param {number} livesUsed - Number of deaths before winning
 * @param {number} timeSeconds - Time taken in seconds
 */
export const trackGameWon = (livesUsed, timeSeconds) => {
    trackEvent('game_won', {
        lives_used: livesUsed,
        time_seconds: Math.round(timeSeconds),
        time_formatted: formatTime(timeSeconds),
        score_tier: getScoreTier(livesUsed, timeSeconds),
    });
};

/**
 * Format time as MM:SS
 */
const formatTime = (timeSeconds) => {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = Math.floor(timeSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate a score tier based on performance
 */
const getScoreTier = (livesUsed, timeSeconds) => {
    if (livesUsed === 0 && timeSeconds < 30) return 'legendary';
    if (livesUsed === 0 && timeSeconds < 60) return 'excellent';
    if (livesUsed <= 2 && timeSeconds < 90) return 'good';
    if (livesUsed <= 5) return 'average';
    return 'struggling';
};
