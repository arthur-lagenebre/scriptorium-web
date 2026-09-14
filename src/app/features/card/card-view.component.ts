import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { CardApi, CardTutor, LanguageValue, SetTutor, toDisplayFaces, TranslationFace, valueIn } from '../../core/api/card.api';
import { LanguageService } from '../../core/language/language.service';
import { OracleTextPipe } from '../../shared/pipes/oracle-text.pipe';
import { TranslationEditorComponent } from './translation-editor.component';

function present(value: string | null): string | null {
  return value !== null && value.trim().length > 0 ? value : null;
}

@Component({
  selector: 'app-card-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OracleTextPipe, TranslationEditorComponent],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  private readonly api = inject(CardApi);
  readonly language = inject(LanguageService);

  readonly id = input.required<string>();

  readonly card = signal<CardTutor | null>(null);
  readonly error = signal(false);
  private readonly chosenPrinting = signal<SetTutor | null>(null);

  readonly faces = computed(() => {
    const loaded = this.card();
    return loaded ? toDisplayFaces(loaded, this.language.selected()) : [];
  });

  readonly printing = computed(() => {
    const chosen = this.chosenPrinting();
    if (chosen)
      return chosen;

    const sets = this.card()?.sets ?? [];
    return sets.length > 0 ? [...sets].sort((a, b) => a.order - b.order)[0] : null;
  });

  readonly rulings = computed(() => {
    const loaded = this.card();
    const all = loaded?.rulings ?? [];
    if (all.length === 0) return [];

    const language = this.language.selected();
    const localized = all.filter(r => r.code === language);

    const source = localized.length > 0 ? localized : all.filter(r => r.code === 'en');
    return source.map(r => r.value);
  });

  constructor() {
    effect(() => {
      const id = this.id();
      this.chosenPrinting.set(null);
      void this.load(id);
    });
  }

  private async load(id: string): Promise<void> {
    this.error.set(false);
    this.card.set(null);

    try {
      const loaded = await this.api.getCard(id);
      this.card.set(loaded);
      this.language.setAvailable(loaded.languages);
    } catch {
      this.error.set(true);
    }
  }

  async reload(): Promise<void> {
    const loaded = await this.api.getCard(this.id());
    this.card.set(loaded);
    this.language.setAvailable(loaded.languages);
  }

  selectPrinting(set: SetTutor): void {
    this.chosenPrinting.set(set);
  }

  englishName(card: CardTutor): string {
    return valueIn(card.names, 'en') ?? card.names[0]?.value ?? '';
  }

  flavorFor(faceId: number) {
    return this.printing()?.flavors.find(f => f.faceId === faceId) ?? null;
  }

  stats(face: { power: string | null; toughness: string | null; loyalty: string | null; defense: number | null }): string | null {
    const power = present(face.power);
    const toughness = present(face.toughness);
    if (power !== null && toughness !== null)
      return `${power}/${toughness}`;

    const loyalty = present(face.loyalty);
    if (loyalty !== null)
      return loyalty;

    return face.defense !== null ? String(face.defense) : null;
  }
}
