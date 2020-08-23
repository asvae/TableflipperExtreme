import { Deck, LandType } from './src/types'

const fs = require ('fs')
const cheerio = require ('cheerio')
const got = require ('got')
import * as crypto from "crypto"
import { generateLands } from './src/random-lands-generator'
import { isJmpLand, convertJmpLand } from './src/jmp-land-converter'
import { generateTTSDecks } from './src/python-script-helpers'

const url = 'https://magic.wizards.com/en/articles/archive/feature/jumpstart-decklists-2020-06-18'

const loadOrReadFromCache = async (url: string): Promise<string> => {
  const fileName = crypto.createHash('md5').update('some_string').digest("hex")
  const path = `./cache/${fileName}`

  if (!fs.existsSync(path)) {
    console.log(`Cache not found, reading from url: ${url}`)
    const result = (await got(url)).body
    fs.writeFileSync(path, result)
    return result
  }

  return fs.readFileSync(path)
}

const loadDecksFromMagicSite = async () => {
  const result = await loadOrReadFromCache(url)
  const $ = cheerio.load(result)
  const decks: Deck[] = []
  $('.deck-group').each((i, deckGroup) => {
    const deck = new Deck()
    deck.title = $(deckGroup).find('.deck-meta h4').text()
    $(deckGroup).find('.deck-list-text .sorted-by-overview-container .row').each((i, row) => {
      const count = $(row).find('.card-count').text()
      const name = $(row).find('.card-name').text()
      deck.cardSets.push([Number(count), name])
    })
    decks.push(deck)
  })
  return decks
}

const replaceLands = (deck: Deck): void => {
  deck.cardSets = deck.cardSets.reduce((acc, cardSet) => {
    const cardNameLower = cardSet[1].toLocaleLowerCase()
    if (cardNameLower in LandType) {
      return [...acc, ...generateLands(cardSet[0], cardNameLower as LandType)]
    }
    if (isJmpLand(cardSet[1])) {
      return [...acc, [cardSet[0], convertJmpLand(cardSet[1])]]
    }
    return [...acc, cardSet]
  }, [])
}

;(async () => {
  const decks = await loadDecksFromMagicSite()
  decks.forEach(replaceLands)

  for (const i in decks) {
    await generateTTSDecks(decks[i])
    console.log(`Deck ${decks[i].title} created. Congrats! You're very good cojer.`)
  }
})()
