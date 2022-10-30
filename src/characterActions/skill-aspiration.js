import { setEnergy, setTimeLife } from "./common.js"

export const setSkill = (character, productChoice, aspiration) => {
  if (isBuy(character.cresceleons, productChoice.preco)) {
    if (character.aspiration === aspiration) return character.skill + productChoice.pontos + 1
    else return character.skill + productChoice.pontos
  }
}

export const cicleTrainCharacterProductPurchased = (character, productChoice, skillChoice) => {
  const TIME_CICLE_TRAINNING = 8000
  const ENERGY_DECREMENT = 4

  const skill = setSkill(character, productChoice, skillChoice)
  const time = setTimeLife(character, TIME_CICLE_TRAINNING)
  const energy = setEnergy(character, ENERGY_DECREMENT)
  const levelSkill = checkLevelSkill(skill)
  const employee = { ...character.employee, level: levelSkill }

  return { ...character, skill, time, energy, employee }
}

export const buyProductItens = (character, productChoice) => {
  const characterBuys = { ...character }

  if (isBuy(character.cresceleons, productChoice.preco)) {
    characterBuys.cresceleons = characterBuys.cresceleons - productChoice.preco
    characterBuys.items.push(productChoice.nome)
  }
  return characterBuys
}

export const isBuy = (cresceleons, priceProductChoice) => {
  if (cresceleons >= priceProductChoice) return true

  return false
}

export const checkLevelSkill = (points) => {
  if (points >= 0 && points <= 16) return 'JUNIOR'
  else if (points >= 17 && points <= 26) return 'PLENO'
  else if (points >= 27) return 'SENIOR'
}
