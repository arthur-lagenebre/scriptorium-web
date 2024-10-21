import { CardFace } from "./cardFace"
import { Language } from "./language"
import { RelatedCard } from "./relatedCard"
import { Sett } from "./sett"

export interface Card {
    OracleId: string
    Names: Language[]
    Typelines: Language[]
    Texts: Language[]
    ManaCost: string
    Sets: Sett[]
    Languages: string[]
    CardFaces: CardFace[]
    RelatedCards: RelatedCard[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    HandModifier?: string
    LifeModifier?: string
}