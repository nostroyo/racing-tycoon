// Boardurance Game State Management

export const GameState = {
    // Current screen
    currentScreen: 'landing',
    
    // Race state
    race: {
        active: false,
        lap: 1,
        totalLaps: 50,
        position: 5,
        totalCars: 20,
        timeElapsed: 0,
        weather: 'sunny', // sunny, rainy, cloudy
        trackType: 'street', // street, circuit, mixed
    },
    
    // Car characteristics (chosen pre-race)
    carCharacteristic: null, // 'curve', 'straight', 'balanced'
    
    // Car status
    car: {
        tireCompound: 'soft', // soft, medium, hard
        tireWear: 100, // percentage
        fuel: 65, // liters
        fuelConsumption: 3.2, // liters per lap
        performanceMultiplier: 1.0,
    },
    
    // Boost cards system
    boostCards: {
        available: 3,
        max: 3,
        cards: [
            { type: 'red', active: true },    // from soft tires
            { type: 'red', active: true },    // from soft tires  
            { type: 'red', active: true },    // from soft tires
        ],
        activeEffect: null,
        effectRemaining: 0, // laps remaining
    },
    
    // Track sections
    trackSections: [
        { type: 'corner', duration: 30, remaining: 30 }, // seconds
        { type: 'straight', duration: 20, remaining: 20 },
        { type: 'corner', duration: 25, remaining: 25 },
        // ... more sections based on track
    ],
    
    // Competitors (simplified for MVP)
    competitors: [
        { id: 1, position: 4, color: 'blue', gap: '+2.1', tireCompound: 'medium' },
        { id: 2, position: 5, color: 'red', gap: '0.0', tireCompound: 'soft', isPlayer: true },
        { id: 3, position: 6, color: 'green', gap: '-1.3', tireCompound: 'hard' },
        // ... more competitors
    ],
    
    // Pit strategy
    pitStrategy: {
        nextPitWindow: { from: 18, to: 22 },
        plannedStop: null,
        lastStop: null,
    },
    
    // Game settings
    settings: {
        sound: true,
        music: true,
        vibrations: true,
        difficulty: 'normal', // easy, normal, hard
    },
    
    // Player progress
    progress: {
        scenariosCompleted: 0,
        totalRaces: 0,
        bestPosition: 20,
        averagePosition: 15,
        boostUsageEfficiency: 0,
    }
};

// State update functions
export const updateRaceState = (updates) => {
    Object.assign(GameState.race, updates);
};

export const updateCarState = (updates) => {
    Object.assign(GameState.car, updates);
};

export const updateBoostCards = (updates) => {
    Object.assign(GameState.boostCards, updates);
};

export const activateBoostCard = (cardIndex) => {
    if (cardIndex >= 0 && cardIndex < GameState.boostCards.cards.length) {
        const card = GameState.boostCards.cards[cardIndex];
        if (card.active) {
            card.active = false;
            GameState.boostCards.available--;
            
            // Set active effect based on card type
            switch (card.type) {
                case 'red':
                    GameState.boostCards.activeEffect = {
                        type: 'overtake',
                        multiplier: 1.08, // +8% speed
                        duration: 1, // 1 lap
                        tirePenalty: 1.2, // +20% wear
                        fuelPenalty: 1.15, // +15% consumption
                    };
                    break;
                case 'yellow':
                    GameState.boostCards.activeEffect = {
                        type: 'balanced',
                        multiplier: 1.03, // +3% speed  
                        duration: 1,
                        tirePenalty: 1.1, // +10% wear
                        fuelPenalty: 1.05, // +5% consumption
                    };
                    break;
                case 'green':
                    GameState.boostCards.activeEffect = {
                        type: 'defense',
                        multiplier: 0.98, // -2% speed (defensive)
                        duration: 2, // 2 laps
                        tireBonus: 0.85, // -15% wear
                        fuelBonus: 0.9, // -10% consumption
                    };
                    break;
            }
            
            GameState.boostCards.effectRemaining = GameState.boostCards.activeEffect.duration;
            return true;
        }
    }
    return false;
};

export const replenishBoostCards = (tireCompound) => {
    // Reset all cards based on new tire compound
    GameState.boostCards.available = 3;
    GameState.boostCards.cards = [];
    
    let cardType = 'red'; // default to soft
    if (tireCompound === 'medium') cardType = 'yellow';
    if (tireCompound === 'hard') cardType = 'green';
    
    for (let i = 0; i < 3; i++) {
        GameState.boostCards.cards.push({
            type: cardType,
            active: true
        });
    }
    
    // Clear any active effect
    GameState.boostCards.activeEffect = null;
    GameState.boostCards.effectRemaining = 0;
};

export const updateTrackSection = () => {
    // Update current track section timer
    if (GameState.trackSections.length > 0) {
        const currentSection = GameState.trackSections[0];
        currentSection.remaining--;
        
        if (currentSection.remaining <= 0) {
            // Move to next section
            GameState.trackSections.shift();
            if (GameState.trackSections.length === 0) {
                // Loop track sections
                resetTrackSections();
            }
        }
    }
};

export const resetTrackSections = () => {
    // Reset track sections based on track type
    GameState.trackSections = [
        { type: 'corner', duration: 30, remaining: 30 },
        { type: 'straight', duration: 20, remaining: 20 },
        { type: 'corner', duration: 25, remaining: 25 },
        { type: 'mixed', duration: 35, remaining: 35 },
        { type: 'straight', duration: 15, remaining: 15 },
    ];
};

export const calculatePerformanceMultiplier = () => {
    if (!GameState.carCharacteristic || GameState.trackSections.length === 0) {
        return 1.0;
    }
    
    const currentSection = GameState.trackSections[0];
    let multiplier = 1.0;
    
    // Base multiplier from car characteristic
    switch (GameState.carCharacteristic) {
        case 'curve':
            multiplier = currentSection.type === 'corner' ? 1.15 : 1.0;
            break;
        case 'straight':
            multiplier = currentSection.type === 'straight' ? 1.15 : 1.0;
            break;
        case 'balanced':
            multiplier = 1.07;
            break;
    }
    
    // Apply boost effect if active
    if (GameState.boostCards.activeEffect) {
        multiplier *= GameState.boostCards.activeEffect.multiplier;
    }
    
    // Apply tire wear penalty
    const tireWearPenalty = 1.0 - ((100 - GameState.car.tireWear) * 0.002); // 0.2% per 1% wear
    multiplier *= tireWearPenalty;
    
    // Apply fuel load penalty (lighter = faster)
    const fuelPenalty = 1.0 - ((65 - GameState.car.fuel) * 0.001); // 0.1% per liter less
    multiplier *= fuelPenalty;
    
    GameState.car.performanceMultiplier = multiplier;
    return multiplier;
};

export const advanceLap = () => {
    if (!GameState.race.active) return;
    
    // Update lap
    GameState.race.lap++;
    GameState.race.timeElapsed += 90; // ~90 seconds per lap
    
    // Update car state
    GameState.car.tireWear -= getTireDegradation();
    GameState.car.fuel -= GameState.car.fuelConsumption;
    
    // Update boost effect
    if (GameState.boostCards.effectRemaining > 0) {
        GameState.boostCards.effectRemaining--;
        if (GameState.boostCards.effectRemaining === 0) {
            GameState.boostCards.activeEffect = null;
        }
    }
    
    // Update track sections (simulate ~90 seconds of racing)
    for (let i = 0; i < 3; i++) {
        updateTrackSection();
    }
    
    // Recalculate performance
    calculatePerformanceMultiplier();
    
    // Update position based on performance
    updatePosition();
    
    // Check for race end
    if (GameState.race.lap >= GameState.race.totalLaps) {
        endRace();
    }
};

export const getTireDegradation = () => {
    let degradation = 2.0; // base % per lap
    
    switch (GameState.car.tireCompound) {
        case 'soft':
            degradation = 3.5;
            break;
        case 'medium':
            degradation = 2.5;
            break;
        case 'hard':
            degradation = 1.5;
            break;
    }
    
    // Apply boost effect modifications
    if (GameState.boostCards.activeEffect) {
        if (GameState.boostCards.activeEffect.tirePenalty) {
            degradation *= GameState.boostCards.activeEffect.tirePenalty;
        }
        if (GameState.boostCards.activeEffect.tireBonus) {
            degradation *= GameState.boostCards.activeEffect.tireBonus;
        }
    }
    
    return degradation;
};

export const updatePosition = () => {
    // Simplified position update based on performance
    const performance = GameState.car.performanceMultiplier;
    
    // Random factor for realism
    const randomFactor = 0.95 + Math.random() * 0.1;
    const effectivePerformance = performance * randomFactor;
    
    // Move up if performing well, down if not
    if (effectivePerformance > 1.05 && GameState.race.position > 1) {
        GameState.race.position--;
    } else if (effectivePerformance < 0.95 && GameState.race.position < GameState.race.totalCars) {
        GameState.race.position++;
    }
    
    // Update competitor gaps (simplified)
    updateCompetitorGaps();
};

export const updateCompetitorGaps = () => {
    // Simplified gap calculation
    GameState.competitors.forEach(comp => {
        if (!comp.isPlayer) {
            // Random gap changes
            const change = (Math.random() - 0.5) * 0.5;
            let gapValue = parseFloat(comp.gap);
            gapValue += change;
            comp.gap = gapValue >= 0 ? `+${gapValue.toFixed(1)}` : `${gapValue.toFixed(1)}`;
        }
    });
};

export const executePitStop = (tireCompound, fuelAmount) => {
    if (!GameState.race.active) return false;
    
    // Update car state
    GameState.car.tireCompound = tireCompound;
    GameState.car.tireWear = 100;
    GameState.car.fuel = fuelAmount;
    
    // Replenish boost cards based on new tires
    replenishBoostCards(tireCompound);
    
    // Record pit stop
    GameState.pitStrategy.lastStop = {
        lap: GameState.race.lap,
        tireCompound,
        fuelAmount
    };
    
    // Lose some time (simplified)
    GameState.race.timeElapsed += 25; // 25 seconds for pit stop
    
    return true;
};

export const startRace = (scenario, carCharacteristic) => {
    GameState.race.active = true;
    GameState.race.lap = 1;
    GameState.race.position = scenario.startingPosition || 5;
    GameState.race.totalLaps = scenario.totalLaps || 50;
    GameState.race.weather = scenario.weather || 'sunny';
    GameState.race.trackType = scenario.trackType || 'street';
    
    GameState.carCharacteristic = carCharacteristic;
    GameState.car.tireCompound = 'soft';
    GameState.car.tireWear = 100;
    GameState.car.fuel = 65;
    GameState.car.fuelConsumption = 3.2;
    
    // Initialize boost cards for soft tires
    replenishBoostCards('soft');
    
    // Initialize track sections
    resetTrackSections();
    
    // Initialize competitors
    initializeCompetitors();
    
    // Calculate initial performance
    calculatePerformanceMultiplier();
    
    GameState.currentScreen = 'race';
};

export const endRace = () => {
    GameState.race.active = false;
    
    // Update progress
    GameState.progress.totalRaces++;
    if (GameState.race.position < GameState.progress.bestPosition) {
        GameState.progress.bestPosition = GameState.race.position;
    }
    
    GameState.currentScreen = 'results';
};

export const initializeCompetitors = () => {
    GameState.competitors = [];
    
    // Player car
    GameState.competitors.push({
        id: 1,
        position: GameState.race.position,
        color: 'red',
        gap: '0.0',
        tireCompound: 'soft',
        isPlayer: true
    });
    
    // Other competitors
    for (let i = 2; i <= 20; i++) {
        const gap = (i - GameState.race.position) * 1.5 + (Math.random() - 0.5);
        const gapFormatted = gap >= 0 ? `+${gap.toFixed(1)}` : `${gap.toFixed(1)}`;
        
        // Random tire compounds
        const compounds = ['soft', 'medium', 'hard'];
        const tireCompound = compounds[Math.floor(Math.random() * compounds.length)];
        
        // Team colors
        const colors = ['blue', 'green', 'yellow', 'silver', 'orange', 'purple'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        GameState.competitors.push({
            id: i,
            position: i,
            color,
            gap: gapFormatted,
            tireCompound,
            isPlayer: false
        });
    }
    
    // Sort by position
    GameState.competitors.sort((a, b) => a.position - b.position);
};

// Export for debugging
window.GameState = GameState;