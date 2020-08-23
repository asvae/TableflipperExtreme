import { Deck, CardColor } from './src/types'
import { generateTTSDecks } from './src/python-script-helpers'
import { ScryfallCard } from './src/scryfall-types'
import { filterByColor } from './src/scryfall-helpers'
import { sendDeckToServer, sendDeckToGameFiles } from './src/server-helpers'

const fs = require('fs')

export const loadAllDecksFromScryfallBackup = () => {
  return JSON.parse(fs.readFileSync('./tmp/oracle-cards-20200809050656.json')) as ScryfallCard[]
}

;(async () => {
  const allCards = loadAllDecksFromScryfallBackup()
  const colors: CardColor[] = ['U']

  const deck: Deck = {
    title: 'AllTheCards',
    cardSets: filterByColor(allCards, colors).map(card => [1, card.name] as [number, string]).splice(0, 500),
    // cardSets: allCards.map(card => [1, card.name]),
  }
  console.log(`Deck has ${deck.cardSets.length} card sets.`)

  console.log(`Generating deck...`)

  const deckPath = await generateTTSDecks(deck)

  console.log(`Deck "${deck.title}" with ${deck.cardSets.length} cards was generated.`)

  console.log(`Sending the deck to server...`)

  await sendDeckToServer(deckPath)

  console.log(`Copying files to TTS folder...`)

  await sendDeckToGameFiles(deckPath, deck.title)

  console.log(`All good. Your cojery is brilliant!`)
})()
