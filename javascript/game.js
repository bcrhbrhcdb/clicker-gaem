// game.js
export let clickAmount = 0;
export let totalClicks = 0;
export let amountPerClick = 1;

export function updateClicks(amount) {
    clickAmount += amount;
    totalClicks += amount;
    console.log(`Updated clicks: clickAmount = ${clickAmount}, totalClicks = ${totalClicks}`);
}

export function updateAmountPerClick(amount) {
    amountPerClick += amount;
    console.log(`Updated amountPerClick: ${amountPerClick}`);
}

export function spendClicks(amount) {
    if (clickAmount >= amount) {
        clickAmount -= amount;
        console.log(`Spent ${amount} clicks. New clickAmount: ${clickAmount}`);
    } else {
        console.error("Attempted to spend more clicks than available");
    }
}

export function setGameState(newClickAmount, newTotalClicks, newAmountPerClick) {
    clickAmount = newClickAmount;
    totalClicks = newTotalClicks;
    amountPerClick = newAmountPerClick;
    console.log(`Game state set: clickAmount = ${clickAmount}, totalClicks = ${totalClicks}, amountPerClick = ${amountPerClick}`);
}