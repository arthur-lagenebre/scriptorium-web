import { CardFace } from "./cardFace"
import { Language } from "./language"
import { RelatedCard } from "./relatedCard"
import { CardSet } from "./cardSet"
import { Ruling } from "./ruling"

export interface Card {
    Id: string
    Names: Language[]
    Typelines: Language[]
    Texts: Language[]
    ManaCost: string
    Sets: CardSet[]
    Languages: string[]
    CardFaces: CardFace[]
    RelatedCards: RelatedCard[]
    Rulings: Ruling[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    HandModifier?: string
    LifeModifier?: string
}