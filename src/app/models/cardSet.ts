import { Flavor } from "./flavor";

export interface CardSet {
    Name: string
    Order: number
    CollectorNumber: string
    Rarity: string
    ImageUrls: string[]
    Flavors: Flavor[]
}
