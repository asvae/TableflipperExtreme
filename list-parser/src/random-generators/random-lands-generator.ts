import { LandType, ScryfallUrl } from '../types'
import { popRandomValueFromArray } from '../helpers'

const lands: Record<LandType, ScryfallUrl[]> = {
  [LandType.plains]: [
    'https://scryfall.com/card/m21/260',
    'https://scryfall.com/card/m21/261',
    'https://scryfall.com/card/m21/262',
  ],
  [LandType.island]: [
    'https://scryfall.com/card/m21/263',
    'https://scryfall.com/card/m21/264',
    'https://scryfall.com/card/m21/265',
  ],
  [LandType.swamp]: [
    'https://scryfall.com/card/m21/266',
    'https://scryfall.com/card/m21/267',
    'https://scryfall.com/card/m21/268',
  ],
  [LandType.mountain]: [
    'https://scryfall.com/card/m21/269',
    'https://scryfall.com/card/m21/270',
    'https://scryfall.com/card/m21/271',
  ],
  [LandType.forest]: [
    'https://scryfall.com/card/m21/272',
    'https://scryfall.com/card/m21/273',
    'https://scryfall.com/card/m21/274',
  ],
}

/**
 * @param quantity
 * @param landType
 */
export const generateLands = (quantity: number, landType: LandType): [number, ScryfallUrl] => {
  const results: Record<ScryfallUrl, number> = {}
  const urls = lands[landType]


  let pool: ScryfallUrl[] = []
  ;[...Array(quantity)].forEach(() => {
    if (!pool.length) {
      // Refresh pool if empty
      pool = [...urls]
    }
    const url = popRandomValueFromArray(pool)
    if (!results[url]) {
      results[url] = 0
    }
    results[url]++
  })

  // @ts-ignore
  return Object.entries(results).map(([url, quantity]) => [quantity, url])
}
