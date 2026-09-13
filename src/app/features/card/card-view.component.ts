import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { CardApi, CardTutor, SetTutor, toDisplayFaces, valueIn } from '../../core/api/card.api';
import { LanguageService } from '../../core/language/language.service';
import { OracleTextPipe } from '../../shared/pipes/oracle-text.pipe';

function present(value: string | null): string | null {
  return value !== null && value.trim().length > 0 ? value : null;
}

@Component({
  selector: 'app-card-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OracleTextPipe],
  template: `
    @if (error()) {
      <p class="notice">Cette carte est introuvable.</p>
    } @else if (card(); as loaded) {
      <article class="card-view">
        @if (printing(); as set) {
          @if (set.imageUrls.length > 0) {
            <figure class="art">
              <img [src]="set.imageUrls[0]" [alt]="englishName(loaded)" loading="lazy">
            </figure>
          }
        }

        <div class="faces">
          @for (face of faces(); track face.faceId) {
            <section class="page-surface face" [attr.lang]="language.selected()">
              <header class="face-head">
                @if (face.name) {
                  <h1>{{ face.name }}</h1>
                } @else {
                  <h1 class="untranslated">Nom à traduire</h1>
                }
                @if (face.manaCost) {
                  <span class="cost" [innerHTML]="face.manaCost | oracleText"></span>
                }
              </header>

              @if (face.typeline) {
                <p class="typeline">{{ face.typeline }}</p>
              } @else {
                <p class="typeline untranslated">Ligne de type à traduire</p>
              }

              @if (face.text) {
                <div class="rules" [innerHTML]="face.text | oracleText"></div>
              } @else {
                <p class="untranslated">Texte de règles à traduire</p>
              }

              @if (flavorFor(face.faceId); as flavor) {
                @if (flavor.flavorText) {
                  <p class="flavor">{{ flavor.flavorText }}</p>
                }
              }

              <footer class="face-foot">
                @if (stats(face); as line) {
                  <span class="stats">{{ line }}</span>
                }
                @if (flavorFor(face.faceId); as flavor) {
                  @if (flavor.artist) {
                    <span class="artist">{{ flavor.artist }}</span>
                  }
                }
              </footer>
            </section>
          }
        </div>

        <aside class="meta">
          <h2>Impressions</h2>
          <ul class="printings">
            @for (set of loaded.sets; track set.code + set.collectorNumber) {
              <li>
                <button type="button" [class.is-selected]="set === printing()" (click)="selectPrinting(set)">
                  <i [class]="'ss ss-' + set.code.toLowerCase()" aria-hidden="true"></i>
                  <span>{{ set.name }}</span>
                  <span class="collector">{{ set.collectorNumber }} · {{ set.rarity }}</span>
                </button>
              </li>
            }
          </ul>

          @if ((loaded.relatedCards ?? []).length > 0) {
            <h2>Cartes liées</h2>
            <ul class="related">
              @for (related of loaded.relatedCards ?? []; track related.name) {
                <li>{{ related.name }} <span class="quiet">{{ related.component }}</span></li>
              }
            </ul>
          }

          @if (rulings().length > 0) {
            <h2>Rulings</h2>
            <ul class="rulings">
              @for (ruling of rulings(); track $index) {
                <li [innerHTML]="ruling | oracleText"></li>
              }
            </ul>
          }
        </aside>
      </article>
    } @else {
      <p class="notice">Chargement…</p>
    }
  `,
  styles: `
    .card-view {
      display: grid;
      grid-template-columns: minmax(0, 22rem) minmax(0, 1fr) minmax(0, 18rem);
      gap: var(--space-8);
      align-items: start;
    }

    .art img {
      inline-size: 100%;
      border-radius: var(--radius-card);
    }

    .faces {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .face {
      padding: var(--space-6);
      border: 1px solid var(--rule);
      border-radius: var(--radius-control);
    }

    .face-head {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--space-4);
    }

    h1 {
      font-size: var(--size-md);
    }

    .typeline {
      margin: var(--space-2) 0 var(--space-4);
      padding-block-end: var(--space-3);
      border-block-end: 1px solid var(--rule);
      font-size: var(--size-sm);
    }

    .flavor {
      margin-block-start: var(--space-4);
      padding-block-start: var(--space-3);
      border-block-start: 1px solid var(--rule);
      font-style: italic;
      color: var(--text-on-page-quiet);
    }

    .untranslated {
      color: var(--text-on-page-quiet);
      font-style: italic;
      text-decoration: underline dotted var(--rule);
      text-underline-offset: 0.3em;
    }

    .face-foot {
      display: flex;
      justify-content: space-between;
      gap: var(--space-4);
      margin-block-start: var(--space-4);
      font-size: var(--size-xs);
      color: var(--text-on-page-quiet);
    }

    .stats {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .meta h2 {
      margin-block: var(--space-6) var(--space-2);
      font-size: var(--size-sm);
      font-weight: 600;
      color: var(--text-on-ink-quiet);
    }

    .meta h2:first-child {
      margin-block-start: 0;
    }

    .meta ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .printings button {
      display: grid;
      inline-size: 100%;
      grid-template-columns: 1.5rem 1fr;
      gap: var(--space-1) var(--space-2);
      padding: var(--space-2);
      text-align: start;
      color: var(--text-on-ink-quiet);
    }

    .printings button:hover,
    .printings .is-selected {
      color: var(--text-on-ink);
      background: color-mix(in srgb, var(--brass) 14%, transparent);
    }

    .printings .ss {
      grid-row: span 2;
      align-self: center;
      font-size: 1.1rem;
    }

    .collector {
      font-size: var(--size-xs);
      font-variant-numeric: tabular-nums;
    }

    .related li,
    .rulings li {
      padding-block: var(--space-2);
      border-block-end: 1px solid var(--ink-line);
      font-size: var(--size-sm);
    }

    .quiet {
      color: var(--text-on-ink-quiet);
      font-size: var(--size-xs);
    }

    .notice {
      color: var(--text-on-ink-quiet);
    }

    @media (max-width: 64rem) {
      .card-view {
        grid-template-columns: 1fr;
      }
    }
  `,
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
