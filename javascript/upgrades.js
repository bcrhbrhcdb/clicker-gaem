export const upgrade1 = document.getElementById("upgrade1");

export const upgrade = [
    
    {
        name: "upgrade1",
        costs: 50,
        gives: 1,
        costMultiplier: 1.05 
    },
]

export function buyUpgrade(upgradeName){
    // add onclick
    const upgradeObject = upgrade.find(item => item.name === upgradeName);
    
    if(upgradeObject){
        const {gives, costs, costMultiplier} = upgradeObject;

        //error finding 
        console.log(`Buying ${upgradeName}`);
        console.log(`Cost: ${costs}`);
        console.log(`Gives: ${gives}`);
        console.log(`Cost Multiplier: ${costMultiplier}`);
            
    }else{
        //upgrade not found
        console.log(`Upgrade "${upgradeName}" not found`);
    }
    
}