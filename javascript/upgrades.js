// upgrades.js
import { totalClicks, clickAmount, updateAmountPerClick, spendClicks } from "./game.js";
import { updateDisplay } from "../script.js";

export const upgrade = [
    {
        name: "upgrade1",
        costs: 55,
        gives: 1,
        costMultiplier: 1.23,
        amountOfUpgrade: 0,
    },
];

export function buyUpgrade(upgradeName) {
    const upgradeObject = upgrade.find(item => item.name === upgradeName);
    
    if (upgradeObject) {
        const { name, gives, costs, costMultiplier, amountOfUpgrade } = upgradeObject;

        console.log(`Attempting to buy ${name}`);
        console.log(`Cost: ${costs}`);
        console.log(`Gives: ${gives}`);
        console.log(`Cost Multiplier: ${costMultiplier}`);
        console.log(`Current Amount: ${amountOfUpgrade}`);
        console.log(`Total Clicks: ${totalClicks}`);
        console.log(`Current Click Amount: ${clickAmount}`);

        // Check if there are enough clicks to purchase the upgrade
        if (clickAmount >= costs) {
            spendClicks(costs); // Deduct from clickAmount
            updateAmountPerClick(gives); // Increase amount per click
            upgradeObject.costs = Math.floor(costs * costMultiplier); // Update costs for next purchase
            upgradeObject.amountOfUpgrade += 1; // Increment upgrade count
            console.log(`Upgrade "${name}" purchased successfully!`);
            console.log(`Next upgrade cost: ${upgradeObject.costs}`);
            console.log(`New Click Amount: ${clickAmount}`);
            updateDisplay();  // Update the display after successful purchase
        } else {
            console.log(`Not enough clicks to buy ${name}. Need ${costs - clickAmount} more.`);
            // Optionally, you can add a visual feedback for the user here
            // For example, flash the upgrade button red or show a message
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
}