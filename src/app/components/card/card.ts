export interface Card {
    OracleId: string
    Names: Language[]
    Typelines: Language[]
    Texts: Text[]
    ManaCost: string
    Sets: Set[]
    CardFaces: CardFace[]
    RelatedCards: RelatedCard[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    HandModifier?: string
    LifeModifier?: string
}

export interface Language {
    Language: string;
    Value: string;
}

export interface Set {
    Name: string
    CollectorNumber: string
    Rarity: string
    Flavors: Flavor[]
}

export interface Flavor {
    FaceId: number
    Artist: string
    FlavorText: string
    FlavorName: string
}

export interface CardFace {
    FaceId: number
    Manacost: string
    Names: Language[]
    Typelines: Language[]
    Texts: Language[]
    Power?: string
    Toughness?: string
    Loyalty?: string
    Defense?: number
}

export interface RelatedCard {
    Name: string
    TypeLine: string
    Component: string
}