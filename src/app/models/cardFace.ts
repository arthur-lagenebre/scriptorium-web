import { Language } from "./Language";

export interface CardFace {
    FaceId: number;
    Manacost: string;
    Names: Language[];
    Typelines: Language[];
    Texts: Language[];
    Power?: string;
    Toughness?: string;
    Loyalty?: string;
    Defense?: number;
}
