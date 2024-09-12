// saveGame.js

import { clickAmount, totalClicks, amountPerClick } from './game.js';
import { upgrade } from './upgrades.js';

const SAVE_KEY = 'clickerGameSave';

export function saveGame() {
    const gameState = {
        clickAmount,
        totalClicks,
        amountPerClick,
        upgrades: upgrade.map(u => ({
            name: u.name,
            costs: u.costs,
            amountOfUpgrade: u.amountOfUpgrade
        }))
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    console.log('Game saved successfully');
}

export function loadGame() {
    const savedState = localStorage.getItem(SAVE_KEY);
    if (savedState) {
        const gameState = JSON.parse(savedState);
        
        // Update game.js variables
        Object.assign(window, {
            clickAmount: gameState.clickAmount,
            totalClicks: gameState.totalClicks,
            amountPerClick: gameState.amountPerClick
        });

        // Update upgrades
        gameState.upgrades.forEach(savedUpgrade => {
            const upgradeToUpdate = upgrade.find(u => u.name === savedUpgrade.name);
            if (upgradeToUpdate) {
                upgradeToUpdate.costs = savedUpgrade.costs;
                upgradeToUpdate.amountOfUpgrade = savedUpgrade.amountOfUpgrade;
            }
        });

        console.log('Game loaded successfully');
        return true;
    }
    console.log('No saved game found');
    return false;
}

export function clearSave() {
    localStorage.removeItem(SAVE_KEY);
    console.log('Save data cleared');
}

// Auto-save every 60 seconds
setInterval(saveGame, 60000);