
const amountOfClicks = document.getElementById("clicks");
const click = document.getElementById("click")
let clickAmount = 0;
let totalClicks = 0;
let amountPerClick = 1;
//add clicks!!111
click.addEventListener('click', ()=>{
    clickAmount += amountPerClick
    totalClicks += amountPerClick
    amountOfClicks.textContent = clickAmount;
    console.log(`Amount of clicks: ${clickAmount} | Total amount of clicks: ${totalClicks}`);
});

if(totalClicks = 30){
    upgrade1.style.display = "block"
}
