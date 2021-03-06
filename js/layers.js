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
        if(hasUpgrade('s',13)&&!inChallenge('s',13)){v=v.mul(upgradeEffect('s',13))}
        if(player.s.dim0.gte(1)){v=v.mul(player.s.dim0.pow(2)) }
        if(hasUpgrade('s',22)&&player.s.dim0.gte(1)){v=v.mul(player.s.dim0.pow(2))}
        if(hasChallenge('s',12)){v=v.mul(challengeEffect('s',12))}


        if(inChallenge("s",12)||inChallenge("s",14)){v=v.root(10)}
        return v
        // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        if(player.v.points.gte(this.softcap)) return OmegaNum(2.5).pow(OmegaNum(1).sub(buyableEffect("v",13)))
        return new ExpantaNum(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
    autoUpgrade(){return hasMilestone("v",10)},
   

    passiveGeneration(){return hasMilestone("s",1)&&!inChallenge('s',14)? 1:0},
    upgrades: {
            11: {
                name:"1",
                description: "升级11-该行每个升级都会使神谕获取增长x2.",
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
               var effectv21 = player.points.add(10).pow(0.3)
               if(hasUpgrade('v',23)){effectv21=effectv21.mul(upgradeEffect('v',23))}
                if(hasUpgrade('v',52)){ effectv21= effectv21.mul(upgradeEffect('v',51).root(10))}
                if(upgradeEffect('v',21).gte('1e2500')){effectv21=effectv21.pow(0.1).mul('1e2500')}
                return effectv21 
            
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',17)},
        },22: {
            name:"1",
            description: "升级22:根据虚空增强神谕产生",
            cost: new ExpantaNum(512),
            effect() {
                var effectv22 =  player.v.points.add(10).pow(0.5)
                if(upgradeEffect('v',22).gte('1e2000')){effectv22 = effectv22.pow(0.2).mul('1e2000')}
                return effectv22

            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            unlocked(){return hasUpgrade('v',21)},
        },23: {
            name:"1",
            description: "升级23:根据虚空增强升级21",
            cost: new ExpantaNum(10000),
            effect() {
                return player.v.points.add(100000).pow(0.15)
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
        51: {
            name:"1",
            description: "恭喜创造空间，神谕获取获得一个基于空间元素*100的对数的指数增幅",
            cost: new ExpantaNum(1e167),
            unlocked(){return hasUpgrade('s',11)},
            effect() {
                return player.points.add(1).pow(player.s.points.add(1).mul(10).root(10))
            },
            effectDisplay() { return "+"+format(player.s.points.add(1).mul(2).log10()) }, // Add formatting to the effect
            
        
        },
        52: {
            name:"1",
            description: "升级52：虚空提升，升级51的buff给与升级21一个微小的buff",
            cost() {return new ExpantaNum('3e578')},
            unlocked(){return hasUpgrade('v',51)},
            
            effectDisplay() { return format(upgradeEffect('v',51).root(10)) +"*"}, // Add formatting to the effect
            
        
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
        
        /*milestones: {
            1: {
                requirementDescription: "1e80虚空",
                effectDescription: "每秒获得10%虚空",
                done() { return player.v.points.gte(1e80) },
                
            },
            
            
        },*/
       
    challenges: {
        11: {
            name: "重塑虚空架构",
            challengeDescription: "虚空的结构太混乱，我们需要重塑一下，但会大幅度降低神谕点数产生(注：完成瞬间挑战消失)",
            canComplete(){return player.points.gte(2e27)},
            goalDescription(){return "2e27创世神谕"},
            rewardDisplay(){return `将虚空获得量乘以神谕的对数的平方，目前*${format(challengeEffect('v',11))}`},
            rewardEffect() {
                return player.points.add(10).logBase(10).pow(2)
            },
            unlocked(){return hasUpgrade('v',41)&&!hasChallenge('v',11)},
            
        },
    },
    
     infoboxes: {
        lore: {
            title: "虚空————一切的开始",
            body() { return "传说在亘古之时，没有时间，没有空间，更没有现在的一切,\n后来，一位创世者从其他世界而来，同时对两个世界进行了单向连接\n于是，一种被称为创世神谕的神级能量出现了，虚空也被逐渐扩张,\n同时,扩张的虚空也增加了获取创世神谕的能力" },
            
        },
        lore1: {
            title: "一个设定补充",
            body() { return "在一切之上，有一个力量一直在尝试调控各个世界的平衡，\n当一个世界发展过于强大之时，这股力量就会进行投影，以限制世界的发展\n根据力量的强度被分成两个种类\n分别是较弱小的软上限和极为强大的硬上限\n软上限只会减慢发展速度，而硬上限则会使得世界发展停滞" },
            unlocked(){return player.v.points.gte(10000000)},
        },
        
    },
    tabFormat: {"虚空核心架构所在":{
        content:[
            ['infobox','lore'],
            ['infobox','lore1'],
            "main-display",
            ['display-text',function(){return `您每秒获得${format(getResetGain(this. layer))}虚空体积(需要空间层的第一个里程碑)`}],
        'blank',
        ["prestige-button", "", function (){ return hasMilestone('s',1)&&!inChallenge('s',14) ? {'display': 'none'} : {}}],
        'blank',
        "buyables",
        'blank',
        ['display-text',function(){return "里程碑"}],
        'blank',
        'milestones',
        ['bar','bigBar'],
        "upgrades",
        "challenges",
     

        
        
        
    ]
}
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
    row: 'side',                                 // The row this layer is on (0 is the first row).
  
    baseResource: "虚空",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.v.points },  // A function to return the current amount of baseResource.

    requires: new ExpantaNum(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new ExpantaNum(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new ExpantaNum(1)
    },

    layerShown() { return hasChallenge('v',11) || player.t.unlocked==true},      // Returns a bool for if this layer's node should be visible in the tree.
    resetsNothing(){return hasMilestone("s",1)||hasMilestone("t",1)==true},
    update(diff){player.t.points = player.t.points.add(ExpantaNum(1).mul(diff))},
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    milestones: {
        1: {
            requirementDescription: "60时间",
            effectDescription: "您玩了1分钟",
            done() { return player.t.points.gte(60) }
        },
        2: {
            requirementDescription: "3600时间",
            effectDescription: "您玩了1小时",
            done() { return player.t.points.gte(3600) }
        },
        3: {
            requirementDescription: "86400时间",
            effectDescription: "您玩了1天",
            done() { return player.t.points.gte(86400) }
        },
        4: {
            requirementDescription: "31536000时间",
            effectDescription: "您玩了1年",
            done() { return player.t.points.gte(31536000) }
        },
        5: {
            requirementDescription: "3153600000时间",
            effectDescription: "您玩了1世纪",
            done() { return player.t.points.gte(3153600000) }
        },
        6: {
            requirementDescription: "7.884e15时间",
            effectDescription: "您玩了1银河年",
            done() { return player.t.points.gte(7.884e15) }
        },
        9: {
            requirementDescription: "3.1536e47时间",
            effectDescription: "您玩了1黑洞纪元",
            done() { return player.t.points.gte(3.1536e47) }
        },
        10: {
            requirementDescription: "1.79e308时间",
            effectDescription: "您玩了1无限时间",
            done() { return player.t.points.gte('1.79e308') }
        },


    },
    infoboxes: {
        lore: {
            title: "时间节点————承载规则的地基",
            body() { return "" },
            
        },
        
    },
    tabFormat: {"时间源头":{
        content:["main-display",
        
        /*['display-text',function(){return `你的空间元素给与创世神谕获取倍数*${format(player.s.points.add(1).pow(3))}`}],
        'blank',
        "prestige-button",
        'blank',*/
        ['display-text',function(){return "里程碑"}],
        'blank',
        'milestones',
        ['bar','bigBar'],
        "upgrades"
        
        
    ]
    },
                 "超越时间":{
                     unlocked(){return false},
                    
                    
                    
                    },},
    })








    var dim0
    var challs13best = ExpantaNum(1)
    
    addLayer("s", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),             // "points" is the internal name for the main resource of the layer.
        dim0:new ExpantaNum(0),
        dim1:new ExpantaNum(0), 
        dim2:new ExpantaNum(0), 
        dim3:new ExpantaNum(0),     //dimension

    }},
    effect(){return player.s.points.add(1).pow(2)},
    effectDisplay() { return format(Effect(this.layer, this.id))+"x" }, // Add formatting to the effect
    branches:['v'],
    color: "#FFFFFF",                       // The color for this layer, which affects many elements.
    resource: "空间元素",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "虚空",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.v.points },  // A function to return the current amount of baseResource.

    requires(){return new ExpantaNum(1)},              // The amount of the base needed to  gain 1 of the prestige currency.                                      // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                          // "normal" prestige gain is (currency^exponent).

    update(diff){if(player.v.points.gte('1e1000')){
        if(inChallenge("s",13)&&player.points.gte(challs13best)){challs13best = player.points}

dim0 = ExpantaNum(1).mul(diff).mul(buyableEffect("s",11).pow(ExpantaNum(1).add(buyableEffect("s",12))))
if(hasUpgrade('s',23)){dim0=dim0.mul(player.s.points)}
if(hasUpgrade('s',24)){dim0=dim0.mul(upgradeEffect('s',24))}
if(hasUpgrade('s',25)){dim0=dim0.mul(upgradeEffect('s',25))}
if(hasUpgrade('s',26)){dim0=dim0.mul(upgradeEffect('s',26))}
if(hasUpgrade('s',27)){dim0=dim0.mul(upgradeEffect('s',27))}
if(hasUpgrade('s',31)){dim0=dim0.mul('1e200')}
if(hasChallenge('s',11)){dim0=dim0.mul(challengeEffect('s',11))}
if(hasChallenge('s',13)){dim0=dim0.mul(challengeEffect('s',13))}
if(hasChallenge('s',14)){dim0=dim0.mul('1e1024')}
player.s.dim0 = player.s.dim0.add(dim0)
//自动空间元素获取
if(hasUpgrade('s',34)){player.s.points = player.s.points.add(getResetGain('s'))}


dim0 = dim0.div(diff)//帧率还原为秒
}},
    
    getNextAt(canMax=false){return ExpantaNum(5e163)},
    gainMult() {     
        var sexp=new ExpantaNum(1)
        if(hasUpgrade('s',12)){sexp = sexp.mul(player.v.points.add(10).logBase(10).pow(player.s.points))}
        return sexp
    },
    getResetGain(){
        //cost = base(=5e163)^x*x^x = 5e163^x * x^x 约等于 5e163^x
        var gain = gain = this.baseAmount().mul(this.gainMult()).add(1).logBase(5e163).sub(player.s.points).max(0)
        return gain.floor()
    },
    prestigeButtonText(){if(hasMilestone('s',2)){ return `将虚空凝结为空间+${format(getResetGain('s'))}\n${format(player.v.points)}虚空/${format(ExpantaNum(5e163).add(1).pow(getResetGain('s').add(player.s.points).add(1)).sub(1).div(this.gainMult('s')))}`}
else{ return `将虚空凝结为空间+${format(ExpantaNum(1))}\n${format(player.v.points)}虚空/${format(ExpantaNum(5e163).add(1).pow(ExpantaNum(1).add(player.s.points)).sub(1).div(this.gainMult('s')))}`}
},
    gainExp() {      
                           // Returns your exponent to your gain of the prestige resource.
        return new ExpantaNum(1)
    },
    canBuyMax(){return hasMilestone("s",2)},
    layerShown() { return hasChallenge('v',11) || player.s.unlocked==true},            // Returns a bool for if this layer's node should be visible in the tree.
    resetsNothing(){return hasMilestone("s",3)},
    



    bars: {
        bigBar: {
            fillStyle: {'background-color' : "#ffDC82"},
            direction: RIGHT,
            width: 200,
            height: 25,
            progress() { return player.v.points.add(1).logBase(10).div(1000) },
            display(){return `距离解锁第零维度(${format(player.v.points.add(1).logBase(10).div(10))})%`},
            
            unlocked(){return player.s.points.gte(1)&&!player.s.dim0.gte(1)}
        },
        bigBar1: {
            fillStyle: {'background-color' : "#ffDC82"},
            direction: RIGHT,
            width: 200,
            height: 25,
            progress() { return player.s.dim0.add(1).logBase(1e100).div(1000) },
            display(){return `距离解锁第一维度(${format(player.s.dim0.add(1).logBase(1e100).div(10))})%`},
            
            unlocked(){return player.s.dim0.gte(1)&&!player.s.dim1.gte(1)}
        },
        
    },
    upgrades: {
        11: {
            name:"1",
            description: "空间平衡升级（1）：开启新的虚空升级",
            cost: new ExpantaNum(0),
            unlocked(){return player.s.points.gte(1)},
        },
        12: {
            name:"1",
            description: "空间平衡升级（2）：空间提升空间获取",
            cost: new ExpantaNum(3),
            unlocked(){return hasUpgrade('s',11)}
        },
        13: {
            name:"1",
            description: "空间平衡升级（3）：基于空间和创世神谕给与虚空一个《微小》的加成",
            cost: new ExpantaNum(5),
            unlocked(){return hasUpgrade('s',11)},
            effect() {
                return player.v.points.add(10000000000).logBase(1.004).pow(player.s.points.add(1).mul(2)).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            name:"1",
            description: "维度升级（1）：将空间元素的buff立方",
            cost: new ExpantaNum(5),
            unlocked(){return hasUpgrade('s',11)}
        },
        22: {
            name:"1",
            description: "维度升级（2）：将第0维度的buff平方",
            cost: new ExpantaNum(1000),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub(1000.0)},
            canAfford(){return player.s.dim0.gte(1000)},
            unlocked(){return player.s.dim0.gte(1)},
        },
        23: {
            name:"1",
            description: "维度升级（2.5）：将维度获取*空间",
            cost: new ExpantaNum(5000),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub(5000)},
            canAfford(){return player.s.dim0.gte(5000)},
            unlocked(){return hasUpgrade('s',22)},
        },
        24: {
            name:"1",
            description: "维度升级（3）：基于虚空和空间增强第零维度的创造",
            cost: new ExpantaNum(1e5),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub(1e5)},
            canAfford(){return player.s.dim0.gte(1e5)},
            unlocked(){return hasUpgrade('s',23)},
            effect() {
                return player.v.points.add(100).logBase(10).pow(player.s.points.div(2))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            name:"1",
            description: "维度升级（4）：第0维度基于自身获得一点倍数",
            cost: new ExpantaNum(1e5),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub(1e5)},
            canAfford(){return player.s.dim0.gte(1e5)},
            unlocked(){return hasUpgrade('s',22)},
            effect() {
                var effects24 =player.s.dim0.logBase(2).pow(5).pow(player.s.dim0.logBase(player.s.dim0.logBase(2).pow(18)))
                if(hasUpgrade('s',26)){effects24 = effects24.mul(upgradeEffect('s',26))}
                return effects24
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        26: {
            name:"1",
            description: "维度升级（5）：第0维度的基础buff（无视升级加成）也给自己一点加成",
            cost: new ExpantaNum('2e64'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('2e64')},
            canAfford(){return player.s.dim0.gte('2e64')},
            unlocked(){return hasUpgrade('s',25)},
            effect() {
                return player.s.dim0.pow(2).pow(0.05).add(1).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        27: {
            name:"1",
            description: "投影升级（4→0，1）：基于时间节点给与你的维度升级(4)一个加成,但是会受到第0维度数量的一点削弱",
            cost: new ExpantaNum('1e322'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('1e322')},
            canAfford(){return player.s.dim0.gte('1e322')},
            unlocked(){return hasUpgrade('s',26)},
            effect() {
                return player.t.points.pow(69).pow(ExpantaNum(1).div(player.s.dim0.logBase(10).pow(0.5)))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        31: {
            name:"1",
            description: "维度升级（6）：简单粗暴——将维度获取*1e200(同时下一次购买会将0维度增幅器购买至最大)",
            cost: new ExpantaNum('2e420'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('2e420')},
            canAfford(){return player.s.dim0.gte('2e420')},
            unlocked(){return hasUpgrade('s',27)},

        },
        32: {
            name:"1",
            description: "维度升级（7）你打破了壁障，最先获得的就是速度的提升，你的第0维度每^100则第0维度增幅器的上限+1",
            cost: new ExpantaNum('0'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('0')},
            canAfford(){return player.s.dim0.gte('0')},
            effect() {
                if(hasUpgrade("s",32)){return player.s.dim0.add(1).logBase(10).div(100).floor()}
                else{return new ExpantaNum(0)}
            },
            unlocked(){return hasChallenge('s',14)},

        },
        33: {
            name:"1",
            description: "解锁升级（1）:解锁收藏层，解锁神器：屏障碎裂",
            cost: new ExpantaNum('2e4400'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('2e4400')},
            canAfford(){return player.s.dim0.gte('2e4400')},
            effect() {
                
            },
            unlocked(){return hasUpgrade('s',32)},

        },
        34: {
            name:"1",
            description: "空间进化（1）:自动购买空间元素",
            cost: new ExpantaNum('6e6969'),
            currencyDisplayName:"第零维度",
            pay(){player.s.dim0 = player.s.dim0.sub('6e6969')},
            canAfford(){return player.s.dim0.gte('6e6969')},
            effect() {
                
            },
            unlocked(){return hasUpgrade('s',32)},

        },
        
        
        // Look in the upgrades docs to see what goes here!
    },  
    milestones: {
            1: {
                requirementDescription: "拥有一个空间元素",
                effectDescription: "每秒获得100%虚空,同时禁用虚空重置",
                done() { return player.s.points.gte(1)&&!inChallenge("s",14) },
            },
            2: {
                requirementDescription: "触发空间联动",
                effectDescription: "你可以获取最大空间元素",
                done() { return hasMilestone('s',1) }
            },
        3: {
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
    
    
    buyables: {
        11: {
            cost(x){ 
               return ExpantaNum(5).pow((getBuyableAmount('s',11)).mul(getBuyableAmount('s',11).add(1).log(5)))
            },
            
            canAfford() { return player[this.layer].dim0.gte(this.cost(getBuyableAmount(this.layer, this.id))) },  
            display() { return `第0维度增幅器(最大${format(new ExpantaNum(256).add(upgradeEffect("s",32)))}个)<br />价格:${format(this.cost(player.s.buyables[11]))}\n已购买:${format(getBuyableAmount('s',11))}\n效果:维度生产*${format(buyableEffect("s",11))}` },
            
            unlocked(){return player.s.dim0.gte(1)}, 
            effect() {
                return ExpantaNum(2.6).pow(getBuyableAmount('s',11))
            },
            
            buy() {
                if(hasUpgrade("s",31)&&getBuyableAmount('s',11)){this.buyMax();return}
                player[this.layer].dim0 = player[this.layer].dim0.sub(this.cost(getBuyableAmount(this.layer, this.id)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax(){
                if(!hasUpgrade("s",32)){setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(ExpantaNum(256).sub(getBuyableAmount('s',11))))}
                if(hasUpgrade("s",32)){setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(ExpantaNum(256).add(upgradeEffect("s",32)).sub(getBuyableAmount('s',11))))}
            
            },
            purchaseLimit(){return ExpantaNum(256).add(upgradeEffect("s",32))}
        },
        12: {
            cost(x){ 
                var dim011cost=new ExpantaNum(1e4)
                dim011cost = dim011cost.pow(getBuyableAmount('s',12).mul(buyableEffect("s",12).add(1)))
                return dim011cost
            },
            canAfford(){return player.s.dim0.gte(ExpantaNum(1e4).pow(getBuyableAmount('s',12).mul(buyableEffect("s",12).add(1))))},   
            display() { return `第0维度稳定器(最大10个)<br />价格:${format(this.cost(player.s.buyables[12]))}\n已购买:${format(getBuyableAmount('s',12))}\n效果:维度生产指数+${format(buyableEffect("s",12))}\n注：长按可购买可以连续购买(在任何树生效)` },
            
            unlocked(){return player.s.dim0.gte(1)}, 
            effect() {
                return ExpantaNum(0.2).mul(getBuyableAmount('s',12))
            },
            buy() {
                player[this.layer].dim0 = player[this.layer].dim0.sub(this.cost(getBuyableAmount(this.layer, this.id)))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            
            purchaseLimit(){return ExpantaNum(10)}
        },
        },
        challenges: {
            11: {
                name: "第0维度飞升障壁（1/4）",
                challengeDescription: "你又到达了一个节点，这一次就不好突破了，你的创世神谕获取被取以2为底的对数",
                canComplete(){return player.points.gte(100000)},
                goalDescription(){return "100000创世神谕"},
                rewardDisplay(){return `根据创世神谕获得一点点0维度的倍数，目前*${format(challengeEffect('s',11))}`},
                rewardEffect() {
                    return player.points.logBase(1.01).pow(2)
                },
                unlocked(){return player.s.dim0.gte("1e1200")},
                onEnter(){player.points = ExpantaNum(1)},
                onExit(){player.points = ExpantaNum(1)},
            },
            12: {
                name: "第0维度飞升障壁（2/4）",
                challengeDescription: "第二层障壁，这次的阻碍减少了，但是突破也更难了，虚空获取开10次方根，",
                canComplete(){return player.points.gte("2e6409")},
                goalDescription(){return "2e6409创世神谕"},
                rewardDisplay(){return `使得维度对于创世神谕获取也有一点点加成,目前*${format(challengeEffect('s',12))}`},
                rewardEffect() {
                    return player.s.dim0.root(2)
                },
                unlocked(){return hasChallenge("s",11)},
                onEnter(){player.points = ExpantaNum(1)
                player.v.points=ExpantaNum(1)},
                onExit(){player.points = ExpantaNum(1)},
            },
            13: {
                name: "第0维度飞升障壁（3/4）",
                challengeDescription: "你的空间升级13失效，同时创世神谕获取/虚空元素",
                canComplete(){return player.points.gte(1)},
                goalDescription(){return "???创世神谕"},
                rewardDisplay(){return `将第0维度的获取基于你在这个挑战中获得的最大创世神谕获得buff,目前*${format(challengeEffect('s',13))}`},
                rewardEffect() {
                    if(player.co.god1besttime.gte(1)){
                        challs13best = challs13best.mul(player.co.points.pow(player.co.points))
                    }
                    return challs13best.root(10)

                },
                unlocked(){return hasChallenge("s",12)},
                onEnter(){player.points = ExpantaNum(1)
                    player.v.points=ExpantaNum(1)},
                onExit(){player.points = ExpantaNum(1)},
            },
            14: {
                name: "第0维度飞升障壁（4/4）",
                challengeDescription: "同时应用前三个挑战的debuff，同时禁用空间里程碑1",
                canComplete(){return player.points.gte(100000)},
                goalDescription(){return "100000创世神谕"},
                rewardDisplay(){return `将第0维度获取*1e1024（1e2e10），同时开启新升级(新升级未完成)`},
                rewardEffect() {
                    return 
                },
                unlocked(){return hasChallenge("s",13)},
                onEnter(){player.points = ExpantaNum(1)
                    player.v.points=ExpantaNum(1)
                    player.s.milestones[0]=''
                },
                onExit(){player.points = ExpantaNum(1)},
            },

        },
        //update(diff){if(player.s.dim0.gte(ExpantaNum(dim011costall))&&hasUpgrade('s',24)){addBuyables('s',11,1)}},

    tabFormat: {"空间管理界面":{
        content:["main-display",
        'blank',
        ['display-text',function(){return hasUpgrade('s',21) ? `空间升级21已启动，你的空间元素给与创世神谕获取倍数*${format(player.s.points.add(1).pow(3).pow(3))}`:`你的空间元素给与创世神谕获取倍数*${format(player.s.points.add(1).pow(3))}`}],
        "prestige-button",
        'blank',
        ['display-text',function(){return "里程碑"}],
        'blank',
        'milestones',
        ['bar','bigBar'],
        ['row',[['upgrade',11],['upgrade',12],['upgrade',13],['upgrade',34]]], 
        ['row',[['upgrade',21],['upgrade',22],['upgrade',24]]],
        "challenges",
    ]
    },
                 "0维空间":{
                     unlocked(){return player.v.points.gte('1e1000')},
                     content:[

                        ['display-text',function(){return "到达1e100000第零维度以解锁第一维度"}],
                        'blank',
                        ['display-text',function(){return `这个#$#%#$(无法解析)拥有${format(player.s.dim0)}第0维度，提升虚空获取*${format(player.s.dim0.add(1).pow(2))}`}],['display-text',function(){return hasUpgrade('s',22) ? `因为空间升级22，第0维度buff以平方,目前为*${format(player.s.dim0.add(1).pow(2).pow(2))}`:``}],
                        'blank',
                        
                        ['display-text',function(){return `每秒有${format(dim0)}个0维空间被创造`}],
                        ['bar','bigBar1'],
                        ['row',[['upgrade',23],['upgrade',25],['upgrade',26],['upgrade',31],['upgrade',32]]],
                        ['row',[['upgrade',27]]],
                        ['row',[['upgrade',33]]]

                     ],
                    },
                    "维度购买项":{
                        unlocked(){return player.s.dim0.gte('1')},      
                        content:[
                            'buyables'
    
                         ],          
                },
            }
})
addLayer("co", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new ExpantaNum(0),
        god1: new ExpantaNum(0),
        god1time: new ExpantaNum(0),     
        god1besttime : new ExpantaNum(0),      // "points" is the internal name for the main resource of the layer.
    }},
update(diff){
    //这里是计算收藏能量的部分
    player.co.points = player.co.god1besttime.div(2)
    //这个是神器1部分
    if(player.points.lt(1)){
        player.co.god1 = new ExpantaNum(0)
        if(player.co.god1time.gte(player.co.god1besttime)){player.co.god1besttime = player.co.god1time}
        player.co.god1time = new ExpantaNum(0)
       
    }
    if(player.co.god1.eq(1)&&player.points.gte(1)){player.co.god1time = player.co.god1time.add(diff)}
    if(player.co.god1.eq(1)&&player.points.gte(1)){player.points = player.points.div(new ExpantaNum(10).pow(player.co.god1time))}
    if(player.co.god1.eq(1)&&player.points.gte(1)&&player.co.god1time.gte(10)){player.points = player.points.pow(new ExpantaNum(1).div(player.co.god1time))}
    if(player.co.god1.eq(1)&&player.points.gte(1)&&player.co.god1time.gte(100)&&player.points.gte("1e1000")){player.points = player.points.logBase(2)}
},
    color: "#FFFF00",                       // The color for this layer, which affects many elements.
    resource: "收藏能量",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new ExpantaNum(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new ExpantaNum(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new ExpantaNum(1)    
    },

    layerShown() { return hasUpgrade("s",33) },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    clickables: {
        11: {
            display() {return player.co.god1.eq(0)?"点击启用神器1\n当前状态：未开启":"点击启用神器1\n当前状态：以开启"},
            canClick(){return true},
            onClick(){
                if(player.co.god1.eq(0)){player.co.god1 = new ExpantaNum(1)}
                else if(player.co.god1.eq(1)){
                    player.co.god1 = new ExpantaNum(0)
                    if(player.co.god1time.gte(player.co.god1besttime)){player.co.god1besttime = player.co.god1time}
                    player.co.god1time = new ExpantaNum(0)
                }
            },
        }
        
    },
    tabFormat: {"藏品库":{
        content:["main-display",
        ["text-input", "thingy"],
        ['display-text',function(){return hasUpgrade("s",33)?`神器1：屏障碎裂者`:``},
        {"color": "write", "font-size": "32px", "font-family": "Comic Sans MS"}],
        ['display-text',function(){return hasUpgrade("s",33)?`开启效果：你的创世神谕会因为屏障的破碎受到冲击而每秒/(10^开启时间)，同时不再获得创世神谕，神谕数量小于1自动退出，基于你开启的最大时间提升飞升屏障挑战3的buff，若10秒内没有退出，则每秒^（1/10秒后的时间）,若100秒内没有归零则每秒log2`:``}],
        ['display-text',function(){return hasUpgrade("s",33)?`当前神器最大开启时间每2秒增加1收藏能量`:``}],
        ['display-text',function(){return hasUpgrade("s",33)?`当前神器开启时间：${format(player.co.god1time)}`:``}],
        ['display-text',function(){return hasUpgrade("s",33)?`当前神器开启最大时间：${format(player.co.god1besttime)}`:``}],
        ['row',[['clickable',11]]]
       
    ]
    },
            }
})












