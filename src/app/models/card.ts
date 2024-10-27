import { CardFace } from "./cardFace"
import { Language } from "./language"
import { RelatedCard } from "./relatedCard"
import { CardSet } from "./cardSet"

export interface Card {
    OracleId: string
    Names: Language[]
    Typelines: Language[]
    Texts: Language[]
    ManaCost: string
    Sets: CardSet[]
    Languages: string[]
    CardFaces: CardFace[]
    RelatedCards: RelatedCard[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    HandModifier?: string
    LifeModifier?: string
}