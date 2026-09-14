import { Injectable, computed, signal } from '@angular/core';

export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  zhs: '简体中文',
  zht: '繁體中文',
  he: 'עברית',
  ar: 'العربية',
  la: 'Latina',
  grc: 'Ἑλληνικά',
  sa: 'संस्कृतम्',
  ph: 'Phyrexian',
};

export interface LanguageEntry {
  code: string;
  name: string;
  translated: boolean;
}

export function languageName(code: string): string {
  return LANGUAGE_NAMES[code] ?? code;
}

const RTL = new Set(['he', 'ar']);

export function languageDirection(code: string): 'ltr' | 'rtl' {
  return RTL.has(code) ? 'rtl' : 'ltr';
}

const STORAGE_KEY = 'scriptorium.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _available = signal<string[]>([]);
  private readonly _selected = signal<string>(this.initial());

  readonly available = this._available.asReadonly();
  readonly selected = this._selected.asReadonly();
  readonly direction = computed(() => languageDirection(this._selected()));

  readonly isEditable = computed(() => this._selected() !== 'en');

  readonly entries = computed<LanguageEntry[]>(() => {
    const available = this._available();

    if (available.length === 0) {
      return [];
    }

    const done = available
      .map(code => ({ code, name: languageName(code), translated: true }))
      .sort(byName);

    const todo = Object.keys(LANGUAGE_NAMES)
      .filter(code => !available.includes(code))
      .map(code => ({ code, name: languageName(code), translated: false }))
      .sort(byName);

    return [...done, ...todo];
  });

  readonly translatedCount = computed(() => this._available().length);
  readonly totalCount = computed(() => Object.keys(LANGUAGE_NAMES).length);

  setAvailable(languages: string[]): void {
    this._available.set(languages);
  }

  select(code: string): void {
    this._selected.set(code);
    localStorage.setItem(STORAGE_KEY, code);
  }

  private initial(): string {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGE_NAMES[stored])
      return stored;

    for (const tag of navigator.languages ?? []) {
      const base = tag.toLowerCase();

      if (base.startsWith('zh'))
        return base.includes('hant') || base.includes('tw') || base.includes('hk') ? 'zht' : 'zhs';

      const short = base.split('-')[0];
      if (LANGUAGE_NAMES[short])
        return short;
    }

    return 'en';
  }
}

function byName(a: LanguageEntry, b: LanguageEntry): number {
  return a.name.localeCompare(b.name);
}
