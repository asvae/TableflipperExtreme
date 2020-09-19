import { CardColor } from './types'

type UUID = string
type Language = 'en'
type DateType = string
type Uri = string
type CardLayout = 'layout' | 'frame' | 'frame_effects' | 'layout' | 'split' | 'flip' | 'transform' | 'double_faced_token' | 'card_faces' | 'meld' | 'related_cards' | 'normal' | 'split' | 'flip' | 'transform' | 'modal_dfc' | 'meld' | 'leveler' | 'saga' | 'adventure' | 'planar' | 'scheme' | 'vanguard' | 'token' | 'double_faced_token' | 'emblem' | 'augment' | 'host' | 'art_series' | 'double_sided'
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
  layout: CardLayout
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
