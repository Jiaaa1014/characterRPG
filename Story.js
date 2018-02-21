let name = prompt('What is the name of ur character?')

let gender = prompt('Your gender?')
let race = prompt('Elf, Dwarf or Halfling?')
let characterRole = prompt('Warrior, Ranger or Rouge?')

const mainHero = new Hero(name, 30, gender, race, characterRole)

checkRace(mainHero, mainHero.race)
checkClass(mainHero, mainHero.characterRole)

// Math.floor(Math.random() * (max - min + 1) + min)

console.log(`前傳blabla`)


mainHero.equipNewWeapon({
  // 劍、拐杖、短劍、弓
  name: prompt('Sword, Staff, Dagger or Bow'),
  minDamage: 1,
  maxDamage: 6
})

mainHero.equipNewArmor({
  name: 'Leather',
  attackBarrierBonus: 3

})
console.log(`轉折`)
/*let enemies = [new Monster(`Goblin`, 2, 7, 10, 5, { attack: 0, sneak: 0, persuade: 0 }, 1, 2)];
let answer = prompt(`What do you do? Attack, Sneak, or Persuade?`);
let victorious = decisionMaker(answer);
if (victorious) {
console.log(`You succeeded in your ${answer} encounter. You leveled up you ${answer} skill!`);
  mainHero.levelUp(answer.toLowerCase());
} else console.log(`You died...`); */

const heroParty = [mainHero]

const talrand = new Hero('Talrand', 10, 'Male', 'Human', 'Warrior',
  { attack: 6, sneak: 2, persuade: 1 },
  { name: 'BoardSword, minDamage:2,maxDamage:8' },
  { name: 'Chain mail', attackBarrierBonus: 5 })

checkClass(talrand, talrand.characterRole)
checkRace(talrand, talrand.race)
heroParty.push(talrand)