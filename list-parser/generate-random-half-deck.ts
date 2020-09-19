import { ScryfallCard } from './src/scryfall-types'
import {
  getCardColors,
  loadAllDecksFromScryfallBackup,
} from './src/scryfall-helpers'
import {
  randomizeColorPool,
  generateRandomColorSets,
} from './src/random-generators/random-half-deck-generator'
import { popRandomValueFromArray } from './src/helpers'
import { generateTTSDecks } from './src/python-script-helpers'
import { sendDeckToServer, sendDeckToGameFiles } from './src/server-helpers'
import { Deck } from './src/types'

;(async () => {
  const allCards = loadAllDecksFromScryfallBackup()
  const cardsByColors = new Map<string, ScryfallCard[]>()
  allCards.forEach(card => {
    if (['planar', 'vanguard', 'scheme', 'token', 'double_faced_token', 'emblem', 'art_series'].includes(card.layout)) return

    const color = getCardColors(card).join('')
    if (!cardsByColors.get(color)) {
      cardsByColors.set(color, [card])
    }
    cardsByColors.get(color).push(card)
  })
  const colorPool = randomizeColorPool()
  const randomColorSets = generateRandomColorSets(colorPool, 12)

  console.log(`Color pool is: ${colorPool.join('') || 'X'}.`)

  const cards: ScryfallCard[] = randomColorSets.map(colorSet => popRandomValueFromArray(cardsByColors.get(colorSet.join(''))))

  console.log(`Here's your cards: `)
  console.log(cards.map(card => `${getCardColors(card).join('') || 'X'}: ${card.name} (${card.scryfall_uri})`))

  const deck: Deck = {
    title: `${Date.now()}-${colorPool.join('') || 'X'}`,
    cardSets: cards.map(card => [1, card.name]),
  }

  console.log(`Generating deck...`)

  const deckPath = await generateTTSDecks(deck)

  console.log(`Deck "${deck.title}" with ${deck.cardSets.length} cards was generated.`)

  console.log(`Sending the deck to server...`)

  await sendDeckToServer(deckPath)

  console.log(`Copying files to TTS folder...`)

  await sendDeckToGameFiles(deckPath, deck.title)

  console.log(`All good. Your cojery is brilliant!`)
})()
