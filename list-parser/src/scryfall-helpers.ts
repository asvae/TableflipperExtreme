import { ScryfallCard } from './scryfall-types'
import { CardColor } from './types'
const fs = require('fs')

export const loadAllDecksFromScryfallBackup = () => {
  return JSON.parse(fs.readFileSync('./tmp/oracle-cards-20200809050656.json')) as ScryfallCard[]
}

export const getCardColors = (card: ScryfallCard): CardColor[] => {
  return card.colors || card.card_faces[0].colors as CardColor[] || []
}

export const hasAllColors = (card: ScryfallCard, colors: CardColor[]): boolean => {
  const cardColors = getCardColors(card)
  return colors.every(color => cardColors.includes(color)) && colors.length === cardColors.length
}

export const filterByColor = (cards: ScryfallCard[], colors: CardColor[]) => {
  const filteredCards = cards.filter(card => hasAllColors(card, colors))
  return filteredCards
}
