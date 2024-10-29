import { Flavor } from "./flavor";

export interface CardSet {
    Name: string
    Code: string
    Order: number
    CollectorNumber: string
    Rarity: string
    ImageUrls: string[]
    Flavors: Flavor[]
}
