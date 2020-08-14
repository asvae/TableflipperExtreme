import { CardSet, Deck } from './src/types'
import { generateTTSDecks } from './src/python-scrip-helpers'

const fs = require ('fs')

export const loadAllDecksFromScryfallBackup = () => {
  return JSON.parse(fs.readFileSync('./tmp/oracle-cards-20200809050656.json'))
}

;(async () => {
  const allCards = loadAllDecksFromScryfallBackup()
  const deck: Deck = {
    title: 'AllTheCards',
    cardSets: allCards.map(card => [1, card.name]).splice(0, 400),
  }
  await generateTTSDecks(deck)
  console.log(`${deck.cardSets.length}-card deck created. Congrats! You're very good cojer.`)

  // const decks = await loadDecksFromMagicSite()
  // decks.forEach(replaceLands)
  //
  // for (const i in decks) {
  //   await generasateTTSDecks(decks[i])
  //   console.log(`Deck ${decks[i].title} created. Congrats! You're very good cojer.`)
  // }
})()
