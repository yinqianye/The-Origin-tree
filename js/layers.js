addLayer("v", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),             // "points" is the internal name for the main resource of the layer.
    
    }},
    color: "#2A1FAA",                       // The color for this layer, which affects many elements.
    resource: "虚空",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
    
    
    baseResource: "void",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    optional(){return hasMilestone('v',0)},

    requires: new ExpantaNum(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    softcap:ExpantaNum(10000000),
    softcapPower:ExpantaNum(0.4),                                 // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                  
        var v= new ExpantaNum(1).mul(layers.v.buyables[13].effect2())        // Returns your multiplier to your gain of the prestige resource.
        if(hasUpgrade('v',24)){ v=v.mul(upgradeEffect('v',24)) }       
        if(hasChallenge('v',11)){v=v.mul(challengeEffect('v',11))}
        return v
        // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        if(player.v.points.gte(this.softcap)) return OmegaNum(2.5).pow(OmegaNum(1).sub(buyableEffect("v",13)))
        return new ExpantaNum(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
    autoUpgrade(){return hasMilestone("v",10)},
   
    passiveGeneration(){return hasMilestone("v",1)? 0.1:0},
    
    upgrades: {
            11: {
                name:"1",
                description: "升级11-该行每个升级都会使点数增长x2.",
                cost: new ExpantaNum(1),
        },
            12: {
            name:"2",
            description: "升级12",
            cost: new ExpantaNum(4),
            unlocked(){return hasUpgrade('v',11)},
            
    },13: {
        name:"1",
        description: "升级13",
        cost: new ExpantaNum(9),
        unlocked(){return hasUpgrade('v',12)},
    },14: {
        name:"1",
        description: "升级14",
        cost: new ExpantaNum(16),
        unlocked(){return hasUpgrade('v',13)},
    },15: {
        name:"1",
        description: "升级15",
        cost: new ExpantaNum(25),
        unlocked(){return hasUpgrade('v',14)},
    },16: {
        name:"1",
        description: "升级16",
        cost: new ExpantaNum(48),
        unlocked(){return hasUpgrade('v',15)},
    },17: {
        name:"1",
        description: "升级17",
        cost: new ExpantaNum(64),
        unlocked(){return hasUpgrade('v',16)},
    },21: {
            name:"1",
            description: "升级21:根据创世神谕增强神谕产生",
            cost: new ExpantaNum(256),
            effect() {
                return player.points.add(10).mul(upgradeEffect('v',23)).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',17)},
        },22: {
            name:"1",
            description: "升级22:根据虚空增强神谕产生",
            cost: new ExpantaNum(512),
            effect() {
                return player.v.points.add(10).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',21)},
        },23: {
            name:"1",
            description: "升级23:根据虚空增强升级21",
            cost: new ExpantaNum(10000),
            effect() {
                return player.v.points.add(10).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',22)},
        },24: {
            name:"1",
            description: "升级24:根据虚空总数改进获取虚空公式倍数",
            cost: new ExpantaNum(50000),
            effect() {

                if(hasUpgrade('v',33)){ return player.v.points.add(10).pow(0.2).mul(upgradeEffect('v',33))}else{return player.v.points.add(10).pow(0.2)}
               
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',23)},
        },25: {
            name:"1",
            description: "升级25：软上限开始（1）:解锁一个可重复购买项用于在软上限中前进",
            cost: new ExpantaNum(2000000),
            unlocked(){return hasUpgrade('v',24)},
        },
        26: {
            name:"1",
            description: "升级26：软上限开始（2）:解锁第二个可重复购买项用于在软上限中前进",
            cost: new ExpantaNum(1e10),
            unlocked(){return hasUpgrade('v',25)},
        },
        27: {
            name:"1",
            description: "升级27：软上限开始（3）:解锁第三个可重复购买项用于在软上限中前进\n（注：此可重复购买项为自动强制购买）",
            cost: new ExpantaNum(3e11),
            unlocked(){return hasUpgrade('v',26)},
        },31: {
            name:"1",
            description: "升级31：软上限开始（4）:第三个可重复购买项的buff现在会作用于前两个可重复购买项的价格",
            cost: new ExpantaNum(1e12),
            unlocked(){return hasUpgrade('v',27)},
        },32: {
            name:"1",
            description: "升级32：软上限开始（5）:根据虚空减少前两个可重复购买项的价格",
            cost: new ExpantaNum(1e15),
            unlocked(){return hasUpgrade('v',31)},
            effect() {
                return player.v.points.add(1).log10().add(1).pow(0.1)
            },
            effectDisplay() { return "变为"+format(upgradeEffect(this.layer, this.id))+"次根" }, // Add formatting to the effect
        },
        33: {
            name:"1",
            description: "升级33：根据神谕增强升级24",
            cost: new ExpantaNum(5e149),
            effect() {
                return player.points.add(1000).logBase(1.1)
            },
            unlocked(){return hasUpgrade('v',32)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        41: {
            name:"1",
            description: "升级41：重载——————开启一个虚空挑战,同时解开第三个可重复购买项的上限，上限外只能加成虚空获取。上限外对虚空的加成加强。",
            cost: new ExpantaNum(1e130),
            unlocked(){return hasUpgrade('v',32)},
            //effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
},


buyables: {
    11: {
        cost(x){ 
            var trueAmount=x
            if(trueAmount.gte(10)) trueAmount=trueAmount.div(10).pow(trueAmount.log10().pow(4).mul(5)).mul(10)
            var basecost=ExpantaNum(1000000).mul(trueAmount).pow(trueAmount)
            if(hasUpgrade('v',31)) basecost=basecost.pow(buyableEffect('v',13).sqrt())
            if(hasUpgrade('v',32)) basecost=basecost.root(upgradeEffect('v', 32))
            return basecost
        },
            
        display() { return `虚空之契约<br />价格:${format(this.cost(player.v.buyables[11]))}\n已购买:${format(getBuyableAmount('v',11))}\n效果:点数x${format(buyableEffect("v",11))}` },
        canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id))) },
        unlocked(){return hasUpgrade('v',25)}, 
        effect() {
            return player[this.layer].points.add(10).pow(getBuyableAmount('v',11)).log10().add(10).pow(getBuyableAmount('v',11).root(0.5))
        },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount(this.layer, this.id)))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        
    },
    12: {
        cost(x){ 
            var trueAmount=x
            if(trueAmount.gte(10)) trueAmount=trueAmount.div(10).pow(trueAmount.log10().pow(4).mul(5)).mul(10)
            var basecost=ExpantaNum(1e10).mul(trueAmount.pow(2)).pow(trueAmount)
            if(hasUpgrade('v',31)) basecost=basecost.pow(buyableEffect('v',13).sqrt())
            if(hasUpgrade('v',32)) basecost=basecost.root(upgradeEffect('v', 32))
            return basecost
        },
        display() { return `虚空之拯救<br />价格:${format(this.cost(getBuyableAmount('v',12)))}\n已购买:${format(getBuyableAmount('v',12))}\n效果:点数x${format(buyableEffect("v",12))}` },
        canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id))) },
        unlocked(){return hasUpgrade('v',26)}, 
        effect() {
            return player[this.layer].points.add(10).pow(getBuyableAmount('v',12)).log10().add(1).pow(getBuyableAmount('v',12).root(0.7))
        },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount(this.layer, this.id)))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        
        },
    13: {
        cost(x) { return new ExpantaNum(1e10).mul(x.add(1)).pow(x.add(1)) },
        display() { return `虚空之天劫<br />价格:${format(this.cost(getBuyableAmount('v',13)))}\n已购买:${format(getBuyableAmount('v',13))}\n效果:以降低点数获取为代价改善虚空软上限（两者都^${format(buyableEffect("v",13))}）\n同时倍增虚空获取x${format(layers.v.buyables[13].effect2())}` },
        canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id))) },
        unlocked(){return hasUpgrade('v',27)}, 
        effect() {
            return OmegaNum(1).div(getBuyableAmount('v',13).min(8).add(1).root(2))
        },
        effect2(){
            if(getBuyableAmount(this.layer, this.id).gte(20)) return new ExpantaNum(1e82).pow(getBuyableAmount(this.layer, this.id).sub(10).log10().pow(3.141592653585))
            var baseEffect = ExpantaNum(10).pow(getBuyableAmount(this.layer, this.id).sqrt())
            if(hasUpgrade("v",41)&&getBuyableAmount(this.layer, this.id).gte(9)) baseEffect = baseEffect.pow(baseEffect.log10().div(3))
            if(hasUpgrade("v",41)&&getBuyableAmount(this.layer, this.id).gte(10)) baseEffect = baseEffect.pow(getBuyableAmount(this.layer, this.id).sub(9).log10().add(1).pow(3))
            if(hasUpgrade("v",41)&&getBuyableAmount(this.layer, this.id).gte(16)) baseEffect = baseEffect.pow(getBuyableAmount(this.layer, this.id).sub(9).log10().add(1).pow(getBuyableAmount(this.layer, this.id).sub(13.75).log10().pow(1.5)))
            return baseEffect
        },
         
        buy() {
            doReset(this.layer)
            player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount(this.layer, this.id)))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        purchaseLimit(){return hasUpgrade("v",41) ? 25 : 8},
    },
},   
update(diff){
    if(hasUpgrade("v",27)) if(player.v.points.gte(layers.v.buyables[13].cost(getBuyableAmount("v",13)))) if(getBuyableAmount(this.layer, 13).lte(7)){
        layers.v.buyables[13].buy()
    }
    else if(hasUpgrade("v",41)&&getBuyableAmount(this.layer, 13).lte(24)){
        layers.v.buyables[13].buy()
    }
} ,   

        // Look in the upgrades docs to see what goes here!
        
        milestones: {
            1: {
                requirementDescription: "1e80虚空",
                effectDescription: "每秒获得10%虚空",
                done() { return player.v.points.gte(1e80) },
                unlocked(){hasUpgrade('v',32)},
            },
            
            
        },
       
    challenges: {
        11: {
            name: "重塑虚空架构",
            challengeDescription: "虚空的结构太混乱，我们需要重塑一下，但会大幅度降低神谕点数产生",
            canComplete(){return player.points.gte(2e27)},
            goalDescription(){return "2e27创世神谕"},
            rewardDisplay(){return `将虚空获得量乘以神谕的对数的平方，目前*${format(challengeEffect('v',11))}`},
            rewardEffect() {
                return player.points.add(10).logBase(10).pow(2)
            },
            unlocked(){return hasUpgrade('v',41)},
            
        },
    },
     infoboxes: {
        lore: {
            title: "虚空————一切的开始",
            body() { return "传说在亘古之时，没有时间，没有空间，更没有现在的一切,\n后来，一位创世者从其他世界而来，同时对两个世界进行了单向连接\n于是，一种被称为创世神谕的神级能量出现了，虚空也被逐渐扩张,\n同时,扩张的虚空也增加了获取创世神谕的能力" },
            
        },
        
    }
}
)
addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#00FF00",                       // The color for this layer, which affects many elements.
    resource: "时间节点",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    branches:['v'],
    baseResource: "虚空",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.v.points },  // A function to return the current amount of baseResource.

    requires: new ExpantaNum(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new ExpantaNum(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new ExpantaNum(1)
    },

    layerShown() { return hasChallenge('v',11) || player.t.unlocked==true},      // Returns a bool for if this layer's node should be visible in the tree.
    resetsNothing(){return hasMilestone("s",1)||hasMilestone("t",1)==true},

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    milestones: {
        1: {
            requirementDescription: "10时间节点",
            effectDescription: "在重置时保持虚空的一切",
            done() { return player.t.points.gte(10) }
        },
    },
    infoboxes: {
        lore: {
            title: "时间节点————承载规则的地基",
            body() { return "" },
            
        },
        
    }
    })
addLayer("s", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),             // "points" is the internal name for the main resource of the layer.
    }},
    effect(){return player.s.points.add(1).pow(2)},
    effectDisplay() { return format(Effect(this.layer, this.id))+"x" }, // Add formatting to the effect
    branches:['v'],
    color: "#FFFFFF",                       // The color for this layer, which affects many elements.
    resource: "空间元素",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "虚空",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.v.points },  // A function to return the current amount of baseResource.

    requires: new ExpantaNum(1),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                          // "normal" prestige gain is (currency^exponent).
    
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new ExpantaNum(5e163).mul(player.s.points.add(1)).pow(1.01)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new ExpantaNum(1)
    },

    layerShown() { return hasChallenge('v',11) || player.s.unlocked==true},            // Returns a bool for if this layer's node should be visible in the tree.
    resetsNothing(){return hasMilestone("s",1)||hasMilestone("t",1)==true},
    bars: {
        bigBar: {
            fillStyle: {'background-color' : "#ffDC82"},
            direction: RIGHT,
            width: 200,
            height: 25,
            progress() { return player.v.points.logBase(10).div(1000) },
            display(){return `距离解锁第零维度(${format(player.v.points.logBase(10).div(10))})%`},
            
            
        },
        
    },
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },  
    milestones: {
        1: {
            requirementDescription: "10空间元素",
            effectDescription: "在重置时保持虚空的一切",
            done() { return player.s.points.gte(10) }
        },
    },
    infoboxes: {
        lore: {
            title: "空间元素————承载物质的领域",
            body() { return "" },
            
        },
        
    },
    tabFormat: {"空间管理界面":{
        content:["main-display",
        ['display-text',function(){return `你的空间元素给与创世神谕获取倍数*${format(player.s.points.add(1).pow(3))}`}],
        'blank',
        "prestige-button",
        'blank',
        ['display-text',function(){return "里程碑"}],
        'blank',
        'milestones',
        ['bar','bigBar'],
        
        
    ]
    },
                 "0维空间":{
                     unlocked(){return hasUpgrade('v',41)},
                    
                    
                    
                    },},
})
