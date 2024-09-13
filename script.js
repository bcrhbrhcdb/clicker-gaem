import { upgrade, buyUpgrade, updateUpgrades, initializeUpgrades } from "./javascript/upgrades.js";
import { clickAmount, totalClicks, amountPerClick, updateClicks } from "./javascript/game.js";
import { saveGame, loadGame, clearSave } from "./javascript/saveGame.js";

let amountOfClicks;
let clickButton;
let upgradeButtons;
let cpsDisplay;

document.addEventListener('DOMContentLoaded', () => {
    amountOfClicks = document.getElementById("clicks");
    clickButton = document.getElementById("click");
    upgradeButtons = document.querySelectorAll("[id^='upgrade']");
    cpsDisplay = document.getElementById("cps");

    // Load saved game
    if (loadGame()) {
        updateDisplay();
    }

    initializeUpgrades(); // Initialize upgrades and CPS

    // Add clicks
    clickButton.addEventListener('click', () => {
        updateClicks(amountPerClick);
        updateDisplay(); // Update display after clicks
        console.log(`Amount of clicks: ${clickAmount} | Total amount of clicks: ${totalClicks}`);

        // Check if upgrades should be shown
        checkUpgradeVisibility();

        // Save game after each click (you might want to throttle this in a real game)
        saveGame();
    });

    // Add upgrade button listeners
    upgradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upgradeName = button.id;
            buyUpgrade(upgradeName);
            updateDisplay(); // Update display after purchase
            saveGame(); // Save game state
        });
    });

    // Add a save button (optional)
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Game';
    saveButton.addEventListener('click', saveGame);
    document.body.appendChild(saveButton);

    // Add a clear save button (optional, for testing)
    const clearSaveButton = document.createElement('button');
    clearSaveButton.textContent = 'Clear Save';
    clearSaveButton.addEventListener('click', () => {
        clearSave();
        location.reload(); // Reload the page to reset the game state
    });
    document.body.appendChild(clearSaveButton);

    // Initial display update
    updateDisplay();
    checkUpgradeVisibility();
});

// Function to update display
function updateDisplay() {
    if (amountOfClicks) {
        amountOfClicks.textContent = Math.floor(clickAmount);
    }
    const totalClicksDisplay = document.getElementById("totalClicks");
    if (totalClicksDisplay) {
        totalClicksDisplay.textContent = Math.floor(totalClicks);
    }
    upgradeButtons.forEach(button => {
        const upgradeObj = upgrade.find(item => item.name === button.id);
        if (upgradeObj) {
            const amountSpan = button.querySelector(`[id^='amountOfUpgrade']`);
            const costSpan = button.querySelector(`[id^='costPerUpgrade']`);
            if (amountSpan) amountSpan.textContent = upgradeObj.amountOfUpgrade;
            if (costSpan) costSpan.textContent = Math.floor(upgradeObj.costs);
        }
    });
    updateCPSDisplay();
    checkUpgradeVisibility();
}

function checkUpgradeVisibility() {
    upgradeButtons.forEach((button) => {
        const upgradeName = button.id;
        const upgradeObj = upgrade.find(item => item.name === upgradeName);
        
        if (upgradeObj && totalClicks >= upgradeObj.costs) {
            button.style.display = "block";
        };
    });
}

function updateCPSDisplay() {
    const totalCPS = upgrade.reduce((sum, u) => {
        return sum + (u.clickPerSecond || 0) * u.amountOfUpgrade;
    }, 0);
    if (cpsDisplay) {
        cpsDisplay.textContent = totalCPS.toFixed(1);
    }
}

// Export updateDisplay for use in other modules if needed
export { updateDisplay, updateCPSDisplay };