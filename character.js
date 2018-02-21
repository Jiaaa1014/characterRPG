class BaseConfig {
  constructor(name, health, skills = { attack: 0, sneak: 0, persuade: 0 }) {
    this.name = name
    this.maxHealth = health
    this.currentHealth = health
    this.isIncapacitated = false;
    this.barriers = {
      attack: 10,
      sneak: 10,
      persuade: 10
    }
    this.skills = skills

  }

  attack() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.attack
  }
  dealDamage() {
    return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1)) + this.equippedWeapon.minDamage
  }
  persuade() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.persuade
  }
  sneak() {
    return Math.floor(Math.random() * 20) + 1 + this.skills.sneak
  }
}

class Hero extends BaseConfig {
  constructor(name, health, gender, race, role, skills,
    weapon = {
      name: 'None',
      minDamage: null,
      maxDamage: null
    }, armor = {
      name: 'None',
      attackBarrierBonus: null,
    }) {
    super(name, health, skills)
    this.gender = gender
    this.race = race
    this.characterRole = role
    this.equippedWeapon = weapon
    this.equippedArmor = armor
  }

  levelUp(skill) {
    this.maxHealth += Math.floor(Math.random() * 6) + 1
    this.skills[skill] + 1
  }
  equipNewWeapon(newWeapon) {
    this.equippedWeapon = newWeapon
  }
  equipNewArmor(newArmor) {
    this.equippedArmor = newArmor
  }
  equipNewArmor(newArmor) {
    this.equippedArmor = newArmor;
    if (this.equippedArmor.attackBarrierBonus) {
      this.barriers.attack -= this.equippedArmor.attackBarrierBonus;
    }
    if (newArmor.attackBarrierBonus) {
      this.barriers.attack += newArmor.attackBarrierBonus;
    }
  };
  rest() {
    this.currentHealth = this.maxHealth
    this.isIncapacitated = false
  }
}

class Monster extends BaseConfig {
  constructor(name, health, attackBarrier, persuadeBarrier, sneakBarrier, skills, minDamage, maxDamage) {
    super(name, health, skills)
    this.barriers.attack = attackBarrier
    this.barriers.persuade = persuadeBarrier
    this.barriers.sneak = sneakBarrier
    this.equippedWeapon = {
      minDamage, maxDamage
    }
  }
}


const checkClass = (hero, characterClass) => {
  let lowerCharacterClass = characterClass.toLowerCase()

  switch (lowerCharacterClass) {
    case 'warrior':
      hero.skills.attack += 3
      hero.skills.sneak -= 1
      break
    case 'ranger':
      hero.skills.attack += 1
      hero.skills.persuade += 1
      hero.skills.sneak += 1
      break
    case 'rouge':
      hero.skills.sneak += 3
      hero.skills.attack -= 1
      break
    default:
      characterClass = prompt(`"${characterClass}" is not valid. Plz rechoose `)
      hero.characterRole = characterClass
      checkClass(hero, characterClass)
      break
  }

}


const checkRace = (hero, race) => {
  let lowerCharacterRace = race.toLowerCase()

  switch (lowerCharacterRace) {
    case 'human':
      break;
    case 'elf':
      hero.skills.persuade += 1
      hero.barriers.persuade += 1
      hero.skills.attack -= 1
      hero.barriers.sneak -= 1
      break
    case 'dwarf':
      hero.skills.attack -= 1
      hero.barriers.attack += 1
      hero.skills.sneak -= 1
      hero.barriers.persuade -= 1
      break
    case 'halfling':
      hero.skills.sneak += 1
      hero.barriers.sneak += 1
      hero.skills.attack -= 1
      hero.barriers.persuade -= 1
      break

    default:
      race = prompt(`"${race}" is not valid. Plz rechoose `)
      hero.race = race
      checkRace(hero, race)
      break
  }
}
