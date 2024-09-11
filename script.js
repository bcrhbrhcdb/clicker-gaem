//import goofy ah upgrades
import { upgrade, upgrade1, buyUpgrade } from "./javascript/upgrades.js";

document.addEventListener('DOMContentLoaded', () => {
    const amountOfClicks = document.getElementById("clicks");
    const clickButton = document.getElementById("click");
    const upgrade1Button = document.getElementById("upgrade1");
    
    export let clickAmount = 0;
    export let totalClicks = 0;
    export let amountPerClick = 1;

    // Initially hide upgrade1
    if (upgrade1Button) {
        upgrade1Button.style.display = "none";
    }

    // Add clicks
    clickButton.addEventListener('click', () => {
        clickAmount += amountPerClick;
        totalClicks += amountPerClick;
        amountOfClicks.textContent = clickAmount;
        console.log(`Amount of clicks: ${clickAmount} | Total amount of clicks: ${totalClicks}`);

        // Check if total clicks is 20 or more
        if (totalClicks >= 20) {
            if (upgrade1Button) {
                upgrade1Button.style.display = "block";
            }
        }
    });
});
