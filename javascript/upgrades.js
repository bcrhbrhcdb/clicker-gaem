// upgrades.js
import { totalClicks, clickAmount, updateAmountPerClick, spendClicks, updateClicks } from "./game.js";
import { updateDisplay, updateCPSDisplay } from "../script.js";

export const upgrade = [
    {
        name: "upgrade1",
        costs: 50,
        gives: 0.5,
        costMultiplier: 1.23,
        amountOfUpgrade: 0,
    },
    {
        name: "upgrade2",
        costs: 100,
        gives: 0,
        costMultiplier: 1.20,
        amountOfUpgrade: 0,
        clickPerSecond: 0.25,
    },
    {
        name: "upgrade3",
        costs: 100,
        gives: 0,
        costMultiplier: 4.5,
        amountOfUpgrade: 0,
        giveMultiplier: 2,
    },
];

let cpsInterval;

export function buyUpgrade(upgradeName) {
    const upgradeObject = upgrade.find(item => item.name === upgradeName);
    
    if (upgradeObject) {
        const { name, gives, costMultiplier, amountOfUpgrade, clickPerSecond, giveMultiplier } = upgradeObject;
        const costs = upgradeObject.costs; // Get the current cost from the upgrade object

        console.log(`Attempting to buy ${name}`);
        console.log(`Cost: ${costs}`);
        console.log(`Current Click Amount: ${clickAmount}`);
        
        if (clickAmount >= costs) {
            spendClicks(costs);
            updateAmountPerClick(gives);
            upgradeObject.costs = Math.floor(costs * costMultiplier);
            upgradeObject.amountOfUpgrade += 1;
            
            if (clickPerSecond) {
                updateCPS();
            }
            
            console.log(`Upgrade "${name}" purchased successfully!`);
            console.log(`Next upgrade cost: ${upgradeObject.costs}`);
            console.log(`New Click Amount: ${clickAmount}`);
            updateDisplay();
            updateCPSDisplay();
        } else {
            console.log(`Not enough clicks to buy ${name}. Need ${costs - clickAmount} more.`);
        }
    } else {
        console.log(`Upgrade "${upgradeName}" not found`);
    }
}

export function updateUpgrades(savedUpgrades) {
    savedUpgrades.forEach(savedUpgrade => {
        const upgradeToUpdate = upgrade.find(u => u.name === savedUpgrade.name);
        if (upgradeToUpdate) {
            upgradeToUpdate.costs = savedUpgrade.costs;
            upgradeToUpdate.amountOfUpgrade = savedUpgrade.amountOfUpgrade;
        }
    });
    updateCPS(); // Update CPS after loading saved upgrades
}

function updateCPS() {
    clearInterval(cpsInterval);
    
    const totalCPS = upgrade.reduce((sum, u) => {
        return sum + (u.clickPerSecond || 0) * u.amountOfUpgrade;
    }, 0);
    
    if (totalCPS > 0) {
        cpsInterval = setInterval(() => {
            updateClicks(totalCPS / 10); // Update every 100ms for smoother increments
            updateDisplay();
        }, 100);
    }
}
export function costMultiplier(){

}
export function initializeUpgrades() {
    updateCPS(); // Initialize CPS when the game starts
}