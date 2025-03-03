const attackButton = document.getElementById("attack")
const battleStart = document.getElementById("battleStart")

function showHP(){
    console.log(`${mc.currentEnemy.name} HP: ${mc.currentEnemy.hp}`)
    console.log(`Your HP: ${mc.hp}`)
}

function showBattleInfo(damage, reciever){
    console.log(`Damage dealt to ${reciever.name}: ${damage}`)
    showHP()
}

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
        showBattleInfo(this.damage,oponent)
    }
    executeSpecialAttack(oponent, attack){
        let damage = Math.round(this.damage*attack.multipy)
        oponent.hp -= damage
        showBattleInfo(this,oponent)
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
        super(...args);
        this.currentEnemy;
    }
}

const attacks = [
    new Attack("Crush Attack",1.6,["injury","bleed"])
]

const mc = new Hero("Nuts", "Dragonslayer", 30, 2)
const firstEnemy = new Enemy(100,attacks[0],"Ornstein", "Morgenstern", 23, 2)

//firstEnemy.executeSpecialAttack(mc,firstEnemy.specialAttack)

battleStart.addEventListener("click", ()=>{
    battleStart.style.display = "none"
    attackButton.style.display = "inline-block"
    fight(firstEnemy)
})

function fight(enemy){
    mc.currentEnemy = enemy;
    mc.turn = mc.agility >= enemy.agility ? true : false
    if(!mc.turn){
        console.log("Enemy turn:")
        enemy.attack(mc)
    }
    attackButton.addEventListener("click", ()=>{
        attackButton.disabled = true;
        console.log("Your turn:")
        mc.attack(enemy)
        setTimeout(()=>{
            enemy.attack(mc)
            attackButton.disabled = false;
        },3000)
        
        if(mc.hp <= 0){
            lose()
        }else if(enemy.hp <= 0){
            victory()
        }
    })
}

function victory(){
    console.log("You won!🤯")
    document.body.style.display = "none"
}
function lose(){
    console.log("You died!💀")
    document.body.style.display = "none"
}
