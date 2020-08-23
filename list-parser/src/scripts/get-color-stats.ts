// Show how many cards each color has.

import {
  loadAllDecksFromScryfallBackup,
} from '../../generate-all-cards-deck'

import { allColorCombinations } from '../mtg-helpers'
import { filterByColor } from '../scryfall-helpers'
import { CardColor } from '../types'

(async () => {
  const allCards = loadAllDecksFromScryfallBackup()
  console.log(`We'll show, how many cards correspond to any given color in MTG:`)
  const results: {colors: CardColor[], count: number}[] = allColorCombinations.map(colors => ({colors, count: filterByColor(allCards, colors).length}))
  results.forEach(result => {
    console.log(`${result.colors.join('') || 'colorless'} - ${result.count} cards`)
  })

  const colorsByNumbers = []
  results.forEach(result => {
    if (!colorsByNumbers[result.colors.length]) {
      colorsByNumbers[result.colors.length] = 0
    }
    colorsByNumbers[result.colors.length] += result.count
  })
  console.log(`Cards for number of colors: ${colorsByNumbers.map((i, n) => n + ': ' + i).join(', ')}`)
})()
