// script.js
import { upgrade, buyUpgrade } from "./javascript/upgrades.js";
import { clickAmount, totalClicks, amountPerClick, updateClicks } from "./javascript/game.js";
import { saveGame, loadGame, clearSave } from "./javascript/saveGame.js";

let amountOfClicks;
let clickButton;
let upgrade1Button;

document.addEventListener('DOMContentLoaded', () => {
    amountOfClicks = document.getElementById("clicks");
    clickButton = document.getElementById("click");
    upgrade1Button = document.getElementById("upgrade1");

    // Load saved game
    if (loadGame()) {
        updateDisplay();
    }

    // Initially hide upgrade1
    if (upgrade1Button) {
        upgrade1Button.style.display = "none";
    }

    // Add clicks
    clickButton.addEventListener('click', () => {
        updateClicks(amountPerClick);
        updateDisplay();
        console.log(`Amount of clicks: ${clickAmount} | Total amount of clicks: ${totalClicks}`);

        // Check if total clicks is 20 or more
        if (totalClicks >= 20) {
            if (upgrade1Button) {
                upgrade1Button.style.display = "block";
            }
        }

        // Save game after each click (you might want to throttle this in a real game)
        saveGame();
    });

    // Add upgrade button listener
    if (upgrade1Button) {
        upgrade1Button.addEventListener('click', () => {
            buyUpgrade("upgrade1");
            updateDisplay();
            saveGame();
        });
    }

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
});

// Function to update display
// Function to update display
function updateDisplay() {
    if (amountOfClicks) {
        amountOfClicks.textContent = clickAmount;
    }
    const totalClicksDisplay = document.getElementById("totalClicks");
    if (totalClicksDisplay) {
        totalClicksDisplay.textContent = totalClicks;
    }
    const upgradeObj = upgrade.find(item => item.name === "upgrade1");
    if (upgradeObj) {
        const amountSpan = document.getElementById("amountOfUpgrade");
        const costSpan = document.getElementById("costPerUpgrade");
        if (amountSpan) amountSpan.textContent = upgradeObj.amountOfUpgrade;
        if (costSpan) costSpan.textContent = upgradeObj.costs;
    }
}

// Export updateDisplay for use in other modules if needed
export { updateDisplay };