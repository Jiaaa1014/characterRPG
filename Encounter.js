let persuasionEncounter = (heroes, enemies) => {
  let persuasionBarrier = 0;
  let persuasionPower = 0

  enemies.forEach(enemy => {
    persuasionBarrier += enemy.barriers.persuade
  })
  heroes.forEach(hero => {
    persuasionPower += hero.persuade()
  })
  return persuasionPower >= persuasionBarrier

}


let sneakEncounter = (heroes, enemies) => {
  let sneakBarrier = 0;
  let sneakPower = 0

  enemies.forEach(enemy => {
    sneakBarrier += enemy.barriers.sneak
  })
  heroes.forEach(hero => {
    sneakPower += hero.sneak()
  })
  return sneakPower >= sneakBarrier

}

let fightEncounter = (heroes, enemies, heroFirst) => {

  let fighting = true
  let totalHeroes = heroes.length
  let totalEnemies = enemies.length

  while (fighting) {
    if (heroFirst) {
      totalEnemies -= teamAttack(heroes, enemies)
      totalHeroes -= teamAttack(enemies, heroes)

    } else {
      totalHeroes -= teamAttack(enemies, heroes)
      totalEnemies -= teamAttack(heroes, enemies)

    }
    if (!totalHeroes) return false
    if (!totalEnemies) return true
  }

}

const teamAttack = (attackers, defenders) => {

  let totalIncapcitated = 0
  const totalAvaliableDefenders = 0

  // 確認守方存活人數
  defenders.forEach(defender => {
    if (!defender.isIncapacitated) totalAvaliableDefenders++
  })

  attackers.forEach(attacker => {
    // 攻方某人掛了或守方沒人
    if (attacker.isIncapacitated || !totalAvaliableDefenders) return

    let target, randomTargetIndex

    // 挑敵人
    while (!target) {
      randomTargetIndex = Math.floor(Math.random() * defenders.length)

      if (!defenders[randomTargetIndex].isIncapacitated) target = defenders[randomTargetIndex]

    }

    // 誰攻擊力量小，受傷
    if (attacker.attack() >= target.barriers.attack) {
      let damage = attacker.dealDamage()

      target.currentHealth -= damage
      console.log(`${attacker.name}(${attacker.currentHealth}) hit ${target.name} (${target.currentHealth})`)

      if (target.currentHealth <= 0) {
        console.log(`${target.name}失去戰鬥能力`)
        target.isIncapacitated = true
        totalIncapcitated++
        totalAvaliableDefenders--

      } else console.log(`${target.name} missed`)
    }
  })
  return totalIncapcitated
}
/* 
const riddleEncounter = () => {
  
  let ans = prompt('You can see me in water, but I never get wet. What am I?')

  // === 等級高於 ||
  if (ans.toLowerCase() === 'a reflection' || ans.toLowerCase() === 'reflection') return true

  else return false
}
 */
const decisionMaker = () => {
  let lowerAns = ans.toLowerCase()

  let result

  switch (lowerAns) {
    case 'attack':
      result = fightEncounter(heroParty, enemies, true)
      break
    case 'sneak':
      result = sneakEncounter(heroParty, enemies)
      break
    case 'persuade':
      result = persuasionEncounter(heroParty, enemies)
      break
    default:
      return decisionMaker(prompt('選擇動作'))
      break
  }
  return result

}