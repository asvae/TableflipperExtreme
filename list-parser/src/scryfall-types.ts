import { CardColor } from './types'

type UUID = string
type Language = 'en'
type DateType = string
type Uri = string
type Layout = 'normal'
type ManaCost = string // {1}{U}

export class ScryfallCard {
  object: 'card'
  id: UUID
  oracle_id: UUID
  multiverse_ids: number[]
  mtgo_id: number
  mtgo_foil_id: number
  tcgplayer_id: number
  name: string
  lang: Language
  released_at: DateType
  uri: Uri
  scryfall_uri: Uri
  layout: 'normal'
  highres_image: boolean
  image_uris: {
    small: Uri,
    normal: Uri,
    large: Uri,
    png: Uri,
    art_crop: Uri,
    border_crop: Uri
  }
  mana_cost: ManaCost
  cmc: number
  type_line: string
  oracle_text: string
  power?: string
  toughness?: string
  colors: CardColor[]
  color_identity: CardColor[]
  keywords: string[]
  card_faces: any
}
