// script.js
import { upgrade, buyUpgrade } from "./javascript/upgrades.js";
import { clickAmount, totalClicks, amountPerClick, updateClicks } from "./javascript/game.js";

let amountOfClicks;
let clickButton;
let upgrade1Button;

document.addEventListener('DOMContentLoaded', () => {
    amountOfClicks = document.getElementById("clicks");
    clickButton = document.getElementById("click");
    upgrade1Button = document.getElementById("upgrade1");

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
    });

    // Add upgrade button listener
    if (upgrade1Button) {
        upgrade1Button.addEventListener('click', () => {
            buyUpgrade("upgrade1");
            updateDisplay();
        });
    }

    // Initial display update
    updateDisplay();
});

// Function to update display
function updateDisplay() {
    if (amountOfClicks) {
        amountOfClicks.textContent = clickAmount;
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