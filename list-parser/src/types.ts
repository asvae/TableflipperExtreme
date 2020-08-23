export type ScryfallUrl = string

export enum LandType {
  plains = "plains",
  island = "island",
  swamp = "swamp",
  mountain = "mountain",
  forest = "forest",
}

export type CardSet = [number, ScryfallUrl]

export class Deck {
  title: string = ''
  cardSets: CardSet[] = []
}

export type CardColor = 'W' | 'U' | 'B' | 'R' | 'G'
