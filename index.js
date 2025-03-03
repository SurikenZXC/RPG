const attackButton = document.getElementById("attack")
const battleStart = document.getElementById("battleStart")

class Attack {
    constructor(attackName, multipy, effects){
        this.attackName = attackName;
        this.multipy = multipy;
        this.effects = effects;
    }
}

class Entity {
    constructor(name,weapon,damage,agility){
        this.name = name;
        this.weapon = weapon;
        this.damage = damage;
        this.agility = agility;
        this.turn = false;
        this.hp = 100;
    }
    attack(oponent){
        oponent.hp -= this.damage
        showHP(oponent)
    }
    executeSpecialAttack(oponent, attack){
        showHP(this)
        oponent.hp -= Math.round(this.damage*attack.multipy)
        showHP(this)
    }
}

class Enemy extends Entity {
    constructor(hp,specialAttack,...args){
        super(...args)
        this.hp = hp;
        this.specialAttack = specialAttack
    }
}

class Hero extends Entity{
    constructor(...args){
        super(...args)
    }
}

const attacks = [
    new Attack("Crush Attack",1.6,["injury","bleed"])
]

const mc = new Hero("Nuts", "Dragonslayer", 40, 2)
const firstEnemy = new Enemy(25,attacks[0],"Ornstein", "Morgenstern", 13, 2)

firstEnemy.executeSpecialAttack(mc,firstEnemy.specialAttack)

console.log(firstEnemy)

battleStart.addEventListener("click", ()=>{
    battleStart.style.display = "none"
    attackButton.style.display = "inline-block"
    fight(firstEnemy)
})

function fight(enemy){
    mc.turn = mc.agility >= enemy.agility ? true : false
    attackButton.addEventListener("click", ()=>{
        mc.attack(enemy)
    })
}

function attack(enemy){
    if(mc.turn){
        enemy.hp -= mc.damage
        console.log(`Enemy HP: ${enemy.hp}`)
        console.log(`Your HP: ${mc.hp}`)
    }else{
        mc.hp -= enemy.damage
        console.log(`Enemy HP: ${enemy.hp}`)
        console.log(`Your HP: ${mc.hp}`)
    }
    if(mc.hp <= 0){
        lose()
    }else if(enemy.hp <= 0){
        victory()
    }
    mc.turn = !mc.turn
}

function victory(){
    console.log("You won!🤯")
    document.body.style.display = "none"
}
function lose(){
    console.log("You died!💀")
    document.body.style.display = "none"
}
function showHP(oponent){
    console.log(`Enemy HP: ${oponent.hp}`)
    console.log(`Your HP: ${mc.hp}`)
}
