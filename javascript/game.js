// game.js
export let clickAmount = 0;
export let totalClicks = 0;
export let amountPerClick = 1;

export function updateClicks(amount) {
    clickAmount += amount;
    totalClicks += amount; // Update total clicks
}

export function updateAmountPerClick(amount) {
    amountPerClick += amount;
}

export function spendClicks(amount) {
    if (clickAmount >= amount) {
        clickAmount -= amount;
    } else {
        console.error("Attempted to spend more clicks than available");
        // Optionally, set clickAmount to 0 to prevent negative values
        // clickAmount = 0;
    }
}

export function setGameState(newClickAmount, newTotalClicks, newAmountPerClick) {
    clickAmount = newClickAmount;
    totalClicks = newTotalClicks;
    amountPerClick = newAmountPerClick;
}