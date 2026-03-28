// Boardurance Main Game Controller

import { GameState, startRace } from './state.js';
import { gameSimulation } from './simulation.js';
import * as screens from '../ui/screens.js';

export class BoarduranceGame {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Boardurance Game Initializing...');
        
        // Initialize UI screens
        screens.init();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start with landing screen
        screens.showScreen('landing');
        
        console.log('Boardurance Game Ready!');
    }
    
    setupEventListeners() {
        // Game simulation events
        gameSimulation.addEventListener('onLapComplete', (data) => {
            screens.updateRaceUI(data);
        });
        
        gameSimulation.addEventListener('onBoostActivated', (data) => {
            screens.updateBoostCards();
            screens.showNotification(`Boost activated: ${data.cardType} boost`);
        });
        
        gameSimulation.addEventListener('onPitStop', (data) => {
            screens.updateCarStatus();
            screens.showNotification(`Pit stop completed on lap ${data.lap}`);
        });
        
        gameSimulation.addEventListener('onPositionChange', (data) => {
            screens.update8BitView();
            if (data.direction === 'up') {
                screens.showNotification(`Gained position! Now P${data.newPosition}`);
            }
        });
        
        gameSimulation.addEventListener('onLowTireWarning', (data) => {
            screens.showWarning(`Tire wear critical: ${data.tireWear}%`);
        });
        
        gameSimulation.addEventListener('onLowFuelWarning', (data) => {
            screens.showWarning(`Fuel low: ${data.fuel}L remaining`);
        });
        
        gameSimulation.addEventListener('onPitWindowOpen', (data) => {
            screens.showOpportunity(`Pit window open (lap ${data.currentLap})`);
        });
        
        gameSimulation.addEventListener('onTireCritical', (data) => {
            screens.showCriticalWarning(`Tires critical! Wear: ${data.tireWear}%`);
        });
        
        // UI event listeners (set up by screens module)
        screens.setGameController(this);
    }
    
    startScenario(scenarioId, carCharacteristic) {
        console.log(`Starting scenario: ${scenarioId} with ${carCharacteristic} car`);
        
        // Load scenario data
        const scenario = this.loadScenario(scenarioId);
        
        // Start race
        startRace(scenario, carCharacteristic);
        
        // Start simulation
        gameSimulation.start();
        
        // Update UI
        screens.showScreen('race');
        screens.updateRaceUI();
    }
    
    loadScenario(scenarioId) {
        // Default Monaco Lap 38 scenario
        return {
            id: 'monaco-lap38',
            name: 'Monaco Lap 38 Challenge',
            description: 'You need to gain positions in the final laps of Monaco',
            startingPosition: 5,
            totalLaps: 12, // Short race for hyper-casual
            weather: 'sunny',
            trackType: 'street',
            difficulty: 'normal',
            optimalCharacteristic: 'curve', // Monaco has many corners
            targetPosition: 3 // Goal position
        };
    }
    
    activateBoost(cardIndex) {
        return gameSimulation.activateBoost(cardIndex);
    }
    
    executePitStop(tireCompound, fuelAmount) {
        return gameSimulation.executePitStop(tireCompound, fuelAmount);
    }
    
    planPitStop(lap, tireCompound, fuelAmount) {
        return gameSimulation.planPitStop(lap, tireCompound, fuelAmount);
    }
    
    getRaceSummary() {
        return gameSimulation.getRaceSummary();
    }
    
    getOptimalBoostRecommendation() {
        return gameSimulation.getOptimalBoostForCurrentSituation();
    }
    
    pauseGame() {
        gameSimulation.pause();
        screens.showScreen('pause');
    }
    
    resumeGame() {
        gameSimulation.resume();
        screens.showScreen('race');
    }
    
    endRace() {
        gameSimulation.stop();
        
        // Calculate results
        const summary = this.getRaceSummary();
        const scenario = this.loadScenario('monaco-lap38');
        
        const results = {
            finalPosition: GameState.race.position,
            targetPosition: scenario.targetPosition,
            lapsCompleted: summary.lapsCompleted,
            tireManagement: this.calculateTireManagementGrade(),
            boostUsage: this.calculateBoostUsageGrade(),
            pitStrategy: this.calculatePitStrategyGrade(),
            overallGrade: this.calculateOverallGrade(),
            keyDecision: this.identifyKeyDecision()
        };
        
        // Update progress
        GameState.progress.scenariosCompleted++;
        GameState.progress.totalRaces++;
        
        if (GameState.race.position < GameState.progress.bestPosition) {
            GameState.progress.bestPosition = GameState.race.position;
        }
        
        // Show results screen
        screens.showResults(results);
    }
    
    calculateTireManagementGrade() {
        const avgTireWear = GameState.car.tireWear; // Simplified
        if (avgTireWear > 60) return 'A';
        if (avgTireWear > 40) return 'B';
        if (avgTireWear > 20) return 'C';
        return 'D';
    }
    
    calculateBoostUsageGrade() {
        const boostCardsUsed = 3 - GameState.boostCards.available;
        const efficiency = boostCardsUsed > 0 ? GameState.race.position / boostCardsUsed : 0;
        
        if (efficiency > 2) return 'A';
        if (efficiency > 1.5) return 'B';
        if (efficiency > 1) return 'C';
        return 'D';
    }
    
    calculatePitStrategyGrade() {
        // Simplified - check if pit was in optimal window
        const pitWindow = GameState.pitStrategy.nextPitWindow;
        const lastStop = GameState.pitStrategy.lastStop;
        
        if (!lastStop) return 'C'; // No pit stop
        
        if (lastStop.lap >= pitWindow.from && lastStop.lap <= pitWindow.to) {
            return 'A';
        } else if (lastStop.lap >= pitWindow.from - 2 && lastStop.lap <= pitWindow.to + 2) {
            return 'B';
        } else {
            return 'D';
        }
    }
    
    calculateOverallGrade() {
        const tireGrade = this.calculateTireManagementGrade();
        const boostGrade = this.calculateBoostUsageGrade();
        const pitGrade = this.calculatePitStrategyGrade();
        
        // Simple averaging
        const grades = [tireGrade, boostGrade, pitGrade];
        const gradeValues = grades.map(g => {
            switch (g) {
                case 'A': return 4;
                case 'B': return 3;
                case 'C': return 2;
                case 'D': return 1;
                default: return 0;
            }
        });
        
        const average = gradeValues.reduce((a, b) => a + b) / gradeValues.length;
        
        if (average >= 3.5) return 'A';
        if (average >= 2.5) return 'B';
        if (average >= 1.5) return 'C';
        return 'D';
    }
    
    identifyKeyDecision() {
        const lastStop = GameState.pitStrategy.lastStop;
        
        if (lastStop && lastStop.lap < 20) {
            return "Early pit stop on lap " + lastStop.lap + " gained advantage";
        }
        
        const boostsUsed = 3 - GameState.boostCards.available;
        if (boostsUsed > 0 && GameState.race.position < 10) {
            return "Strategic boost usage helped gain positions";
        }
        
        return "Consistent pace maintained position";
    }
    
    // Utility methods
    saveProgress() {
        // Save to localStorage
        try {
            localStorage.setItem('boardurance_progress', JSON.stringify(GameState.progress));
            console.log('Progress saved');
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }
    
    loadProgress() {
        // Load from localStorage
        try {
            const saved = localStorage.getItem('boardurance_progress');
            if (saved) {
                GameState.progress = JSON.parse(saved);
                console.log('Progress loaded');
            }
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
    }
    
    resetGame() {
        gameSimulation.reset();
        GameState.currentScreen = 'landing';
        screens.showScreen('landing');
    }
}

// Create and export singleton instance
export const game = new BoarduranceGame();

// Export for debugging and manual control
window.BoarduranceGame = game;
window.game = game;