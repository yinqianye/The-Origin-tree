let modInfo = {
	name: "起源之扩张",
	id: "起源",
	author: "yinqianye",
	pointsName: "创世神谕",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.1.1</h3><br>
- 增加空间层，和第1维度.<br>
- 数字大约为1e1740.<br>		

<h3>v0.1.0</h3><br>
		- 完成基础虚空层.<br>
		- 数字大约为1e300.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	let gain = new ExpantaNum(1)
	var tvu = 0
for(i=11;i<=17;i++){
if (hasUpgrade('v', i)) tvu+=1
}
if (hasUpgrade('v', 21)) gain = gain.times(upgradeEffect('v', 21))
if (hasUpgrade('v', 22)) gain = gain.times(upgradeEffect('v', 22))
//if (hasUpgrade('v', 23)) gain = gain.times(upgradeEffect('v', 23))
if (hasUpgrade('v', 24)) gain = gain.times(upgradeEffect('v', 24))
//if (hasUpgrade('v', 25)) gain = gain.times(upgradeEffect('v', 25))
//if (hasUpgrade('v', 31)) gain = gain.times(upgradeEffect('v', 31))
//if (hasUpgrade('v', 32)) gain = gain.times(upgradeEffect('v', 32))
//if (hasUpgrade('v', 33)) gain = gain.times(upgradeEffect('v', 33))
//if (hasUpgrade('v', 41)) gain = gain.times(upgradeEffect('v', 41))
if (hasUpgrade('v', 51)) gain = gain.times(upgradeEffect('v', 51))
if (hasUpgrade('v', 51)) gain = gain.times(OmegaNum(2))
if (getBuyableAmount('v',11)) gain = gain.times(buyableEffect('v', 11))
if (getBuyableAmount('v',12)) gain = gain.times(buyableEffect('v', 12))
if (getBuyableAmount('v',13)) gain = gain.pow(buyableEffect("v",13))
gain = gain.times(OmegaNum(2).pow(tvu))

//下面是层级buff
if(hasUpgrade('s',21)){
	gain = gain.mul(player.s.points.add(1).pow(3).pow(3))
}else{
	gain = gain.mul(player.s.points.add(1).pow(3))
}

//下面是挑战专用
//虚空挑战11debuff
if(inChallenge("v",11)) gain = gain.pow(0.1)
//

	
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}