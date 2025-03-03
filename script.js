const attackButton = document.getElementById("attack")
const heavyAttackButton = document.getElementById("heavyAttack")
const attackButtons = document.querySelector(".attackButtons")
const battleStartButton = document.getElementById("battleStart")
const turnText = document.querySelector(".turn")
const damageDealtText = document.querySelector(".damageDealt")
const enemyHPText = document.querySelector(".enemyHP")
const yourHPText = document.querySelector(".yourHP")
const victoryText = document.querySelector(".victoryText")
const attackTypeText = document.querySelector(".attackTypeText")


let isInBattle = false;

function showHP(){
    enemyHPText.innerHTML = `${mc.currentEnemy.name} HP: ${mc.currentEnemy.hp}`
    yourHPText.innerHTML =`Your HP: ${mc.hp}`
}


class Attack {
    constructor(name, multiply, effects){
        this.name = name;
        this.multiply = multiply;
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
        this.effects = [
            {
                name: "bleed",
                damage: 6,
                amount: 0
            }
        ]
    }
    showBattleInfo(oponent,damage, attackName = "Default Attack"){
        turnText.innerHTML = `${oponent.name == "Nuts" ? "Enemy" : "Your"} turn:`
        attackTypeText.innerHTML = `${this.name} is using ${attackName}`
        damageDealtText.innerHTML =`Damage dealt to ${oponent.name}: ${damage}`
        showHP()
    }
    attack(oponent, attack = {name: "Normal Attack", multiply: 1, effects: []}){
        let damage = Math.round(this.damage*attack.multiply)
        oponent.hp -= damage
        this.showBattleInfo(oponent,damage,attack.name)
        if(mc.hp <= 0){
            lose()
        }else if(oponent.hp <= 0){
            victory()
        }
    }
    //executeSpecialAttack(oponent, attack){
    //     let damage = Math.round(this.damage*attack.multiply)
    //     oponent.hp -= damage
    //     this.showBattleInfo(oponent,damage, attack.name)
    //     if(mc.hp <= 0){
    //         lose()
    //     }else if(oponent.hp <= 0){
    //         victory()
    //     }
    // }

    
}

class Enemy extends Entity {
    constructor(hp,specialAttack,...args){
        super(...args)
        this.hp = hp;
        this.specialAttack = specialAttack
    }
    randAttack(oponent){
        const someAttack = attacks[Math.floor(Math.random()*attacks.length)];
        this.attack(oponent,someAttack)
    }
}

class Hero extends Entity{
    constructor(...args){
        super(...args);
        this.currentEnemy;
    }
}

const attacks = [
    new Attack("Crush Attack",1.6,["injury"]),
    new Attack("Charge",1.4,["dizzy"]),
    new Attack("Jump Attack",1.3,["injury"])
]

const mc = new Hero("Nuts", "Dragonslayer", 30, 2)
const firstEnemy = new Enemy(100,attacks[0],"Ornstein", "Morgenstern", 23, 2)



function fight(enemy){
    isInBattle = true;
    mc.currentEnemy = enemy;
    mc.turn = mc.agility >= enemy.agility ? true : false
    if(!mc.turn){
        enemy.randAttack(mc)
    }
    attackButton.addEventListener("click", ()=>{
        attackButton.disabled = true;
        mc.attack(enemy)
        if(isInBattle){
            setTimeout(()=>{
                enemy.randAttack(mc)
                attackButton.disabled = false;
            },1000)
        }
    })
    heavyAttackButton.addEventListener("click", ()=>{
        mc.attack(enemy)
    })
}

function endOfBattle(){
    isInBattle = false;
    mc.currentEnemy = "";
    victoryText.id = "victoryText"
    attackButtons.style.display = "none"
    attackButton.disabled = false;
    battleStartButton.style.display = "inline-block"
}

function victory(){
    victoryText.innerHTML = "You won!🤯"
    endOfBattle()
}
function lose(){
    victoryText.innerHTML = "You died!💀"
    endOfBattle()
}
battleStartButton.addEventListener("click", ()=>{
    battleStartButton.style.display = "none"
    attackButtons.style.display = "inline-block"
    fight(firstEnemy)
})