import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Une valeur traduite, telle que l'API les renvoie : un tableau, pas un dictionnaire. */
export interface LanguageValue {
  code: string;
  value: string;
}

export interface FlavorTutor {
  faceId: number;
  artist: string;
  flavorText: string;
  flavorName: string;
}

export interface SetTutor {
  name: string;
  code: string;
  order: number;
  collectorNumber: string;
  rarity: string;
  imageUrls: string[];
  flavors: FlavorTutor[];
}

export interface CardFaceTutor {
  faceId: number;
  manaCost: string;
  names: LanguageValue[];
  typelines: LanguageValue[];
  texts: LanguageValue[];
  power: string | null;
  toughness: string | null;
  loyalty: string | null;
  defense: number | null;
}

export interface RelatedCardTutor {
  component: string;
  name: string;
  typeLine: string;
}

export interface RulingTutor {
  code: string;
  value: string;
  publishedAt?: string;
}

export interface CardTutor {
  id: string;
  names: LanguageValue[];
  typelines: LanguageValue[];
  texts: LanguageValue[];
  rulings: RulingTutor[];
  manaCost: string;
  sets: SetTutor[];
  languages: string[];
  cardFaces: CardFaceTutor[];
  relatedCards: RelatedCardTutor[];
  power: string | null;
  toughness: string | null;
  loyalty: string | null;
  handModifier: string | null;
  lifeModifier: string | null;
}

/** Ce que l'écran affiche : une face, quelle que soit la structure d'origine. */
export interface DisplayFace {
  faceId: number;
  manaCost: string;
  name: string | null;
  typeline: string | null;
  text: string | null;
  power: string | null;
  toughness: string | null;
  loyalty: string | null;
  defense: number | null;
}

export interface TranslationFace {
  faceId: number;
  name: string | null;
  text: string | null;
  typeline: string | null;
}

export interface TranslationView {
  cardId: string;
  language: string;
  faces: TranslationFace[];
}

export interface RevisionView {
  id: string;
  targetType: string;
  faceId: number;
  language: string;
  previousValue: string | null;
  newValue: string | null;
  comment: string | null;
  status: string;
  createdAt: string;
  userId: string;
  userDisplayName: string;
}

/** Valeur dans la langue demandée, sans repli silencieux sur l'anglais. */
export function valueIn(values: LanguageValue[], language: string): string | null {
  return values.find(v => v.code === language)?.value ?? null;
}

/**
 * Aplanit une carte en faces affichables.
 *
 * Une carte simple porte ses traductions à la racine et `cardFaces` vide ;
 * une carte à deux faces a l'inverse. Le reste de l'interface n'a pas à
 * connaître cette différence.
 */
export function toDisplayFaces(card: CardTutor, language: string): DisplayFace[] {
  if (card.cardFaces.length > 0) {
    return card.cardFaces
      .slice()
      .sort((a, b) => a.faceId - b.faceId)
      .map(face => ({
        faceId: face.faceId,
        manaCost: face.manaCost,
        name: valueIn(face.names, language),
        typeline: valueIn(face.typelines, language),
        text: valueIn(face.texts, language),
        power: face.power,
        toughness: face.toughness,
        loyalty: face.loyalty,
        defense: face.defense,
      }));
  }

  return [{
    faceId: 0,
    manaCost: card.manaCost,
    name: valueIn(card.names, language),
    typeline: valueIn(card.typelines, language),
    text: valueIn(card.texts, language),
    power: card.power,
    toughness: card.toughness,
    loyalty: card.loyalty,
    defense: null,
  }];
}

@Injectable({ providedIn: 'root' })
export class CardApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiBaseUrl}/api`;

  /** Bascule temporaire sur le jeu de test tant que la base n'est pas peuplée. */
  private readonly useFixture = true;

  private fixture?: Promise<CardTutor[]>;

  private loadFixture(): Promise<CardTutor[]> {
    this.fixture ??= firstValueFrom(this.http.get<CardTutor[]>('/cards.json'));
    return this.fixture;
  }

  async getCard(id: string): Promise<CardTutor> {
    if (this.useFixture) {
      const cards = await this.loadFixture();
      const found = cards.find(c => c.id === id);
      if (!found) throw new Error(`Carte introuvable dans le jeu de test : ${id}`);
      return found;
    }

    return firstValueFrom(this.http.get<CardTutor>(`${this.base}/CardTutors/${id}`));
  }

  async search(name: string): Promise<CardTutor[]> {
    if (this.useFixture) {
      const cards = await this.loadFixture();
      const needle = name.toLowerCase();
      return cards.filter(c => c.names.some(n => n.value.toLowerCase().includes(needle)));
    }

    return firstValueFrom(
      this.http.get<CardTutor[]>(`${this.base}/CardTutors/search/${encodeURIComponent(name)}`)
    );
  }

  getTranslation(cardId: string, language: string): Promise<TranslationView> {
    return firstValueFrom(
      this.http.get<TranslationView>(`${this.base}/cards/${cardId}/translations/${language}`)
    );
  }

  saveTranslation(
    cardId: string,
    language: string,
    faces: TranslationFace[],
    comment: string | null
  ): Promise<{ revisions: number }> {
    return firstValueFrom(
      this.http.put<{ revisions: number }>(
        `${this.base}/cards/${cardId}/translations/${language}`,
        { faces, comment }
      )
    );
  }

  getHistory(cardId: string, language?: string): Promise<RevisionView[]> {
    const query = language ? `?language=${language}` : '';
    return firstValueFrom(
      this.http.get<RevisionView[]>(`${this.base}/cards/${cardId}/history${query}`)
    );
  }

  revert(cardId: string, revisionId: string): Promise<{ revisions: number }> {
    return firstValueFrom(
      this.http.post<{ revisions: number }>(`${this.base}/cards/${cardId}/revert/${revisionId}`, {})
    );
  }
}
