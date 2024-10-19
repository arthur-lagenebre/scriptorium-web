import { CardFace } from "./CardFace"
import { Language } from "./Language"
import { RelatedCard } from "./RelatedCard"
import { Sett } from "./Sett"

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