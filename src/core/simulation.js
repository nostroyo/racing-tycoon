// Boardurance Game Simulation Engine

import { GameState, advanceLap, calculatePerformanceMultiplier } from './state.js';

export class GameSimulation {
    constructor() {
        this.gameLoop = null;
        this.lastUpdateTime = 0;
        this.timeScale = 10; // 10x real-time for 3-5 minute races
        this.updateInterval = 1000; // Update every second (game time)
        
        // Game event listeners
        this.eventListeners = {
            onLapComplete: [],
            onBoostActivated: [],
            onPitStop: [],
            onPositionChange: [],
            onRaceEnd: []
        };
    }
    
    start() {
        if (this.gameLoop) return;
        
        this.lastUpdateTime = Date.now();
        this.gameLoop = setInterval(() => this.update(), this.updateInterval);
        console.log('Game simulation started');
    }
    
    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
            console.log('Game simulation stopped');
        }
    }
    
    update() {
        if (!GameState.race.active) return;
        
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // in seconds
        this.lastUpdateTime = currentTime;
        
        // Update game time
        GameState.race.timeElapsed += deltaTime * this.timeScale;
        
        // Check if a lap should be completed (approx 90 seconds per lap at normal speed)
        const lapDuration = 90 / this.timeScale; // Real seconds per lap
        const gameTimePerLap = 90; // Game seconds per lap
        
        if (GameState.race.timeElapsed >= GameState.race.lap * gameTimePerLap) {
            this.completeLap();
        }
        
        // Update UI
        this.triggerEvent('onGameUpdate', { deltaTime });
    }
    
    completeLap() {
        const oldPosition = GameState.race.position;
        
        // Advance game state
        advanceLap();
        
        // Trigger events
        this.triggerEvent('onLapComplete', {
            lap: GameState.race.lap,
            position: GameState.race.position,
            tireWear: GameState.car.tireWear,
            fuel: GameState.car.fuel,
            performance: GameState.car.performanceMultiplier
        });
        
        // Check for position change
        if (oldPosition !== GameState.race.position) {
            this.triggerEvent('onPositionChange', {
                oldPosition,
                newPosition: GameState.race.position,
                direction: oldPosition > GameState.race.position ? 'up' : 'down'
            });
        }
        
        // Check for pit stop opportunity
        this.checkPitStopOpportunity();
        
        // Check for low tire wear warning
        if (GameState.car.tireWear < 30) {
            this.triggerEvent('onLowTireWarning', { tireWear: GameState.car.tireWear });
        }
        
        // Check for low fuel warning
        if (GameState.car.fuel < 20) {
            this.triggerEvent('onLowFuelWarning', { fuel: GameState.car.fuel });
        }
    }
    
    checkPitStopOpportunity() {
        const pitWindow = GameState.pitStrategy.nextPitWindow;
        const currentLap = GameState.race.lap;
        
        // Check if we're in the pit window
        if (currentLap >= pitWindow.from && currentLap <= pitWindow.to) {
            this.triggerEvent('onPitWindowOpen', {
                currentLap,
                window: pitWindow
            });
        }
        
        // Check if tire wear is critical
        if (GameState.car.tireWear < 20 && !GameState.pitStrategy.plannedStop) {
            this.triggerEvent('onTireCritical', { tireWear: GameState.car.tireWear });
        }
    }
    
    activateBoost(cardIndex) {
        if (!GameState.race.active) return false;
        
        // Check if boost is available
        if (cardIndex >= 0 && cardIndex < GameState.boostCards.cards.length) {
            const card = GameState.boostCards.cards[cardIndex];
            
            if (card.active) {
                // Import the activateBoostCard function
                import('./state.js').then(module => {
                    const success = module.activateBoostCard(cardIndex);
                    
                    if (success) {
                        this.triggerEvent('onBoostActivated', {
                            cardIndex,
                            cardType: card.type,
                            effect: GameState.boostCards.activeEffect
                        });
                        
                        // Recalculate performance with boost
                        calculatePerformanceMultiplier();
                    }
                });
                
                return true;
            }
        }
        
        return false;
    }
    
    executePitStop(tireCompound, fuelAmount) {
        if (!GameState.race.active) return false;
        
        // Import the executePitStop function
        import('./state.js').then(module => {
            const success = module.executePitStop(tireCompound, fuelAmount);
            
            if (success) {
                this.triggerEvent('onPitStop', {
                    lap: GameState.race.lap,
                    tireCompound,
                    fuelAmount,
                    timeLost: 25 // seconds
                });
                
                // Set next pit window (simplified)
                GameState.pitStrategy.nextPitWindow = {
                    from: GameState.race.lap + 15,
                    to: GameState.race.lap + 20
                };
                GameState.pitStrategy.plannedStop = null;
            }
        });
        
        return true;
    }
    
    planPitStop(lap, tireCompound, fuelAmount) {
        if (!GameState.race.active) return false;
        
        GameState.pitStrategy.plannedStop = {
            lap,
            tireCompound,
            fuelAmount
        };
        
        this.triggerEvent('onPitStopPlanned', GameState.pitStrategy.plannedStop);
        return true;
    }
    
    cancelPlannedPitStop() {
        GameState.pitStrategy.plannedStop = null;
        this.triggerEvent('onPitStopCancelled');
    }
    
    getRaceSummary() {
        return {
            lapsCompleted: GameState.race.lap - 1,
            totalLaps: GameState.race.totalLaps,
            position: GameState.race.position,
            timeElapsed: GameState.race.timeElapsed,
            estimatedRaceTime: GameState.race.totalLaps * 90, // 90 seconds per lap
            carStatus: {
                tireWear: GameState.car.tireWear,
                tireCompound: GameState.car.tireCompound,
                fuel: GameState.car.fuel,
                performance: GameState.car.performanceMultiplier
            },
            boostStatus: {
                available: GameState.boostCards.available,
                cards: GameState.boostCards.cards,
                activeEffect: GameState.boostCards.activeEffect,
                effectRemaining: GameState.boostCards.effectRemaining
            },
            trackStatus: {
                currentSection: GameState.trackSections[0] || null,
                sectionsRemaining: GameState.trackSections.length,
                carCharacteristic: GameState.carCharacteristic,
                advantage: this.calculateCurrentAdvantage()
            }
        };
    }
    
    calculateCurrentAdvantage() {
        if (!GameState.carCharacteristic || GameState.trackSections.length === 0) {
            return 'none';
        }
        
        const currentSection = GameState.trackSections[0];
        
        switch (GameState.carCharacteristic) {
            case 'curve':
                return currentSection.type === 'corner' ? 'high' : 'low';
            case 'straight':
                return currentSection.type === 'straight' ? 'high' : 'low';
            case 'balanced':
                return 'medium';
            default:
                return 'none';
        }
    }
    
    getOptimalBoostForCurrentSituation() {
        if (!GameState.race.active || GameState.boostCards.available === 0) {
            return null;
        }
        
        const currentSection = GameState.trackSections[0] || { type: 'mixed' };
        const carCharacteristic = GameState.carCharacteristic;
        const position = GameState.race.position;
        const tireWear = GameState.car.tireWear;
        
        // Find available boost cards
        const availableCards = GameState.boostCards.cards
            .map((card, index) => ({ ...card, index }))
            .filter(card => card.active);
        
        if (availableCards.length === 0) return null;
        
        // Simple AI to recommend best boost
        let recommendedCard = availableCards[0];
        let reason = 'Default choice';
        
        // Strategy based on situation
        if (position > 10 && currentSection.type === 'straight') {
            // Behind and on straight - use red for overtake
            const redCard = availableCards.find(card => card.type === 'red');
            if (redCard) {
                recommendedCard = redCard;
                reason = 'Overtake opportunity on straight';
            }
        } else if (tireWear < 40) {
            // Low tires - use green for conservation
            const greenCard = availableCards.find(card => card.type === 'green');
            if (greenCard) {
                recommendedCard = greenCard;
                reason = 'Save tires with defense boost';
            }
        } else if (carCharacteristic === 'curve' && currentSection.type === 'corner') {
            // Car excels in corners and in corner section - use yellow for balanced push
            const yellowCard = availableCards.find(card => card.type === 'yellow');
            if (yellowCard) {
                recommendedCard = yellowCard;
                reason = 'Maximize cornering advantage';
            }
        }
        
        return {
            cardIndex: recommendedCard.index,
            cardType: recommendedCard.type,
            reason
        };
    }
    
    // Event system
    addEventListener(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }
    
    removeEventListener(event, callback) {
        if (this.eventListeners[event]) {
            const index = this.eventListeners[event].indexOf(callback);
            if (index > -1) {
                this.eventListeners[event].splice(index, 1);
            }
        }
    }
    
    triggerEvent(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${event} listener:`, error);
                }
            });
        }
    }
    
    // Utility methods
    setTimeScale(scale) {
        this.timeScale = Math.max(1, Math.min(scale, 100)); // Clamp between 1-100
        console.log(`Time scale set to ${this.timeScale}x`);
    }
    
    pause() {
        this.stop();
        this.triggerEvent('onGamePaused');
    }
    
    resume() {
        this.start();
        this.triggerEvent('onGameResumed');
    }
    
    reset() {
        this.stop();
        
        // Reset simulation state
        this.lastUpdateTime = 0;
        this.timeScale = 10;
        
        // Clear all event listeners
        Object.keys(this.eventListeners).forEach(event => {
            this.eventListeners[event] = [];
        });
        
        console.log('Game simulation reset');
    }
}

// Create singleton instance
export const gameSimulation = new GameSimulation();

// Export for debugging
window.gameSimulation = gameSimulation;