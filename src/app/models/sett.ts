import { Flavor } from "./Flavor";

export interface Sett {
    Name: string;
    Order: number;
    CollectorNumber: string;
    Rarity: string;
    ImageUrl: string;
    Flavors: Flavor[];
}
