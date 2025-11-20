// Simple Linear Congruential Generator (LCG)
class SeededRNG {
    constructor(seed) {
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }

    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        // returns in range [0, 1]
        return this.nextInt() / (this.m - 1);
    }

    nextRange(start, end) {
        // returns in range [start, end)
        var rangeSize = end - start;
        var randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }

    choice(array) {
        return array[this.nextRange(0, array.length)];
    }
}

export const getDailySeed = () => {
    const now = new Date();
    // Use UTC to ensure global consistency
    const seedString = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;

    // Simple hash to convert string to integer
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        const char = seedString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export const getRNG = () => {
    return new SeededRNG(getDailySeed());
};
