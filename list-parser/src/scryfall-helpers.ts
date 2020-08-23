import { ScryfallCard } from './scryfall-types'
import { CardColor } from './types'

export const hasAllColors = (card: ScryfallCard, colors: CardColor[]): boolean => {
  const cardColors = card.colors || card.card_faces[0].colors as CardColor[] || []

  const result = colors.every(color => cardColors.includes(color)) && colors.length === cardColors.length
  return result
}

export const filterByColor = (cards: ScryfallCard[], colors: CardColor[]) => {
  const filteredCards = cards.filter(card => hasAllColors(card, colors))
  return filteredCards
}
