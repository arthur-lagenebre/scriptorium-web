import { Language } from "./language";

export interface CardFace {
    FaceId: number
    ManaCost: string
    Names: Language[]
    Typelines: Language[]
    Texts: Language[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    Defense?: number
}
