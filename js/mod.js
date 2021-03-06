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
	num: "0.1.4",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.1.5</h3><br>
- 使用了本树第一个clickable，增加收藏层，增加几个升级，数值大约在1e75000
<br><br>
<h3>v0.1.4</h3><br>
- 调整一些数值（所以请忽略v0.1.3的数字），插入一个升级，增加4个挑战，数字大概为1e17174或1e17250（等待反馈ing）
<br><br>
<h3>v0.1.3</h3><br>
- 增加3个升级，数字大概为1ee12800
<br><br>
<h3>v0.1.2</h3><br>
- 增加两个升级和两个第0维度可重复购买项<br>
<h3>v0.1.1</h3><br>
- 增加空间层，和第0维度.<br>
- 数字大约为1e1900.<br>		

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
	//点数基础增益》》最高优先级
    
	//剩下的
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
if(inChallenge("s",11)||inChallenge("s",14)) gain = gain.log(10)
//if(inChallenge("s",12)||inChallenge("s",14)) gain = gain.log(10)   s挑战12的debuff在虚空获取处
if(inChallenge("s",13)||inChallenge("s",14)) gain = gain.div(player.v.points)
//创世神谕软上限
if(player.points.gte('1ee5')) gain = gain.pow(0.01).mul('1ee5')
//获取强制数值

if(player.co.god1.eq(1)) gain = new ExpantaNum(0)

	
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