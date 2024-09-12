// upgrades.js
import { totalClicks, updateAmountPerClick, spendClicks } from "./game.js";
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

        console.log(`Buying ${name}`);
        console.log(`Cost: ${costs}`);
        console.log(`Gives: ${gives}`);
        console.log(`Cost Multiplier: ${costMultiplier}`);
        console.log(`Amount: ${amountOfUpgrade}`);

        if (totalClicks >= costs) {
            spendClicks(costs);
            updateAmountPerClick(gives);
            upgradeObject.costs = Math.floor(costs * costMultiplier);
            upgradeObject.amountOfUpgrade += 1;
            console.log(`Upgrade "${name}" purchased successfully!`);
            console.log(`Next upgrade cost: ${upgradeObject.costs}`);
            updateDisplay();  // Update the display after successful purchase
        } else {
            console.log(`Not enough clicks to buy ${name}. Need ${costs - totalClicks} more.`);
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