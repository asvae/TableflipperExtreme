const jmpLandsMap = {
  'Rainbow Terramorphic Expanse': 'https://scryfall.com/card/jmp/78',

  'Under the Sea Island': 'https://scryfall.com/card/jmp/46',
  'Wizards Island': 'https://scryfall.com/card/jmp/47',
  'Above the Clouds Island': 'https://scryfall.com/card/jmp/48',
  'Archaeology Island': 'https://scryfall.com/card/jmp/49',
  'Milling Island': 'https://scryfall.com/card/jmp/50',
  'Spirits Island': 'https://scryfall.com/card/jmp/51',
  'Pirates Island': 'https://scryfall.com/card/jmp/52',
  'Well-Read Island': 'https://scryfall.com/card/jmp/53',

  'Legion Plains': 'https://scryfall.com/card/jmp/38',
  'Doctor Plains': 'https://scryfall.com/card/jmp/39',
  'Angels Plains': 'https://scryfall.com/card/jmp/40',
  'Unicorns Plains': 'https://scryfall.com/card/jmp/41',
  'Enchanted Plains': 'https://scryfall.com/card/jmp/42',
  'Heavily Armed Plains': 'https://scryfall.com/card/jmp/43',
  'Feathered Friends Plains': 'https://scryfall.com/card/jmp/44',
  'Dogs Plains': 'https://scryfall.com/card/jmp/45',

  'Tree Hugging Forest': 'https://scryfall.com/card/jmp/70',
  'Lands Forest': 'https://scryfall.com/card/jmp/71',
  'Plus One Forest': 'https://scryfall.com/card/jmp/72',
  'Dinosaurs Forest': 'https://scryfall.com/card/jmp/73',
  'Cats Forest': 'https://scryfall.com/card/jmp/74',
  'Walls Forest': 'https://scryfall.com/card/jmp/75',
  'Time to Feed Forest': 'https://scryfall.com/card/jmp/76',
  'Elves Forest': 'https://scryfall.com/card/jmp/77',

  'Dragons Mountain': 'https://scryfall.com/card/jmp/62',
  'Devilish Mountain': 'https://scryfall.com/card/jmp/63',
  'Seismic Mountain': 'https://scryfall.com/card/jmp/64',
  'Goblins Mountain': 'https://scryfall.com/card/jmp/65',
  'Spellcasting Mountain': 'https://scryfall.com/card/jmp/66',
  'Smashing Mountain': 'https://scryfall.com/card/jmp/67',
  'Lightning Mountain': 'https://scryfall.com/card/jmp/68',
  'Minotaurs Mountain': 'https://scryfall.com/card/jmp/69',

  'Minions Swamp': 'https://scryfall.com/card/jmp/54',
  'Discarding Swamp': 'https://scryfall.com/card/jmp/55',
  'Reanimated Swamp': 'https://scryfall.com/card/jmp/56',
  'Rogues Swamp': 'https://scryfall.com/card/jmp/57',
  'Phyrexian Swamp': 'https://scryfall.com/card/jmp/58',
  'Witchcraft Swamp': 'https://scryfall.com/card/jmp/59',
  'Vampires Swamp': 'https://scryfall.com/card/jmp/60',
  'Spooky Swamp': 'https://scryfall.com/card/jmp/61',
}

import { ScryfallUrl } from './types'

/**
 * Jumpstart lands have unconventional naming, so we want to convert them
 * to scryfall links directly.
 */
export const convertJmpLand = (cardName: string): ScryfallUrl => {
  return jmpLandsMap[cardName]
}

export const isJmpLand = (cardName: string): boolean => {
  return cardName in jmpLandsMap
}
